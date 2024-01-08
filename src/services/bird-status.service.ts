import { AppDataSource } from '../data-source';
import { BirdStatus } from '../entity/bird-status';

export class BirdStatusService {
  constructor(
    private birdStatusRepository = AppDataSource.getRepository(BirdStatus)
  ) {}

  async findAll() {
    return await this.birdStatusRepository.find();
  }

  async findById(id: number) {
    return await this.birdStatusRepository.findOne({ where: { id } });
  }

  async findByName(statusName: string) {
    return await this.birdStatusRepository.findOne({ where: { statusName } });
  }

  async create(data: BirdStatus) {
    return await this.birdStatusRepository.save(data);
  }
}
