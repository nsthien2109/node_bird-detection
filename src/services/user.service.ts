import { AppDataSource } from "../data-source";
import { User } from "../entity/user";
import { startOfDay, endOfDay } from "date-fns";

export class UserService {
  constructor(private userRepository = AppDataSource.getRepository(User)) {}

  async findAll() {
    return await this.userRepository.find({
      relations: {
        role: true,
        histories: {
          predictions: {
            bird: true,
          },
        },
      },
    });
  }

  async count() {
    return await this.userRepository.count({});
  }

  async countNewAccountWeekly() {
    const today = new Date();
    const start_date = new Date(today);
    start_date.setDate(today.getDate() - 6);

    const end_date = new Date(today);

    // Create a date range array
    const date_range = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(start_date);
      date.setDate(start_date.getDate() + i);
      date_range.push(date);
    }

    const stats = await this.userRepository
      .createQueryBuilder("users")
      .select("DATE(users.created_at) as date, COUNT(users.id) as count")
      .where("users.created_at BETWEEN :start_date AND :end_date", {
        start_date: startOfDay(start_date),
        end_date: endOfDay(end_date),
      })
      .groupBy("DATE(user.created_at)")
      .getRawMany();

    const result = date_range.map((date) => {
      const dateString = date.toISOString().split("T")[0];
      const count = stats.find((stat) => stat.date === dateString)?.count || 0;
      return { date: dateString, count };
    });

    return result;
  }

  async findById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      relations: {
        role: true,
        histories: {
          predictions: {
            bird: true,
          },
        },
      },
    });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      relations: {
        role: true,
        histories: {
          predictions: {
            bird: true,
          },
        },
      },
    });
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }

  async findByEmailAndPassword(email: string, password: string) {
    return await this.userRepository.findOne({
      where: { email, password },
      relations: {
        histories: {
          predictions: {
            bird: true,
          },
        },
      },
    });
  }

  async save(data: User) {
    return await this.userRepository.save(data);
  }

  async update(id: number, updateData: User) {
    await this.userRepository.update(id, updateData);
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
