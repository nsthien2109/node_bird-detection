import { AppDataSource } from "../data-source";
import { BirdFamily } from "../entity/bird-family";

export class BirdFamilyService {
  constructor(private birdFamilyRepository = AppDataSource.getRepository(BirdFamily)) {}

  async findAll() {
    return await this.birdFamilyRepository.find();
  }

  async findById(id: number) {
    return await this.birdFamilyRepository.findOne({ where: { id }, relations: { birds: {} } });
  }

  async findByName(familyName: string) {
    return await this.birdFamilyRepository.findOne({ where: { familyName } });
  }

  async create(data: BirdFamily) {
    return await this.birdFamilyRepository.save(data);
  }
}
