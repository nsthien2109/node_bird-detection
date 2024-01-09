import { AppDataSource } from "../data-source";
import { BirdStatus } from "../entity/bird-status";

export class BirdStatusService {
  constructor(private birdStatusRepository = AppDataSource.getRepository(BirdStatus)) {}

  async findAll() {
    return await this.birdStatusRepository.find({});
  }

  async findById(id: number) {
    return await this.birdStatusRepository.findOne({
      where: { id },
      relations: { birds: { status: true, order: true, family: true } },
    });
  }

  async count() {
    return await this.birdStatusRepository.count({});
  }

  async findByName(statusName: string) {
    return await this.birdStatusRepository.findOne({
      where: { statusName },
      relations: {
        birds: {
          status: true,
          order: true,
          family: true,
        },
      },
    });
  }

  async create(data: BirdStatus) {
    return await this.birdStatusRepository.save(data);
  }
}
