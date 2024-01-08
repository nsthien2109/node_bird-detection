import { AppDataSource } from '../data-source';
import { BirdOrder } from '../entity/bird-order';

export class BirdOrderService {
  constructor(
    private birdOrderRepository = AppDataSource.getRepository(BirdOrder)
  ) {}

  async findAll() {
    return await this.birdOrderRepository.find();
  }

  async findById(id: number) {
    return await this.birdOrderRepository.findOne({ where: { id } });
  }

  async findByName(orderName: string) {
    return await this.birdOrderRepository.findOne({ where: { orderName } });
  }

  async create(data: BirdOrder) {
    return await this.birdOrderRepository.save(data);
  }
}