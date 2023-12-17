import { AppDataSource } from "../data-source";
import { Bird } from "../entity";

export class BirdService {
  constructor(private birdRepository = AppDataSource.getRepository(Bird)) {}

  async findAll(page: number, pageSize: number) {
    return await this.birdRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async findById(id: number) {
    return await this.birdRepository.findOne({ where: { id } });
  }

  async count() {
    return await this.birdRepository.count({});
  }

  async findByKeyword(page: number, pageSize: number, keyword: string) {
    const queryBuilder = this.birdRepository.createQueryBuilder("birds");
    queryBuilder.where(
      "bird.common_name LIKE :keyword OR bird.vietnamese_name LIKE :keyword OR bird.scientific_name LIKE :keyword",
      {
        keyword: `%${keyword}%`,
      }
    );

    queryBuilder.skip((page - 1) * pageSize).take(pageSize);
    return await queryBuilder.getManyAndCount();
  }

  async updateClassName(id: number, className: string) {
    const bird = await this.findById(id);
    bird.class_name = className;
    await this.birdRepository.update(id, bird);
  }
}
