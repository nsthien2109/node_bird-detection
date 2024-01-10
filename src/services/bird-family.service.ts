import { AppDataSource } from "../data-source";
import { BirdFamily } from "../entity/bird-family";

export class BirdFamilyService {
  constructor(
    private birdFamilyRepository = AppDataSource.getRepository(BirdFamily)
  ) {}

  async findAll() {
    return await this.birdFamilyRepository.find();
  }

  async findById(id: number) {
    return await this.birdFamilyRepository.findOne({
      where: { id },
      relations: { birds: { status: true, order: true, family: true } },
    });
  }

  async count() {
    return await this.birdFamilyRepository.count({});
  }

  async findByName(familyName: string) {
    return await this.birdFamilyRepository.findOne({
      where: { familyName },
      relations: { birds: { status: true, order: true, family: true } },
    });
  }

  async create(data: BirdFamily) {
    return await this.birdFamilyRepository.save(data);
  }
}
