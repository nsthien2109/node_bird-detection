import * as readline from 'readline';
import * as fs from 'fs';
import { BirdOrderService } from '../services/bird-order.service';
import { BirdOrder } from '../entity/bird-order';
export class BirdOrderController {
  private birdOrderService = new BirdOrderService();

  async fillData() {
    const rl = readline.createInterface({
      input: fs.createReadStream(__dirname + '/temp/bird_order.csv', 'utf-8'),
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      const [orderName, orderVietnameseName] = line.split('-');
      await this.updateData(orderName, orderVietnameseName);
    }
  }

  async updateData(orderName: string, orderVietnameseName: string) {
    try {
      // Check for existing entry with the same orderName
      const existingOrder = await this.birdOrderService.findByName(orderName);

      if (!existingOrder) {
        const birdOrder = new BirdOrder();
        birdOrder.orderName = orderName.slice(1, orderName.trim().length);
        birdOrder.orderVietnameseName = orderVietnameseName.slice(
          0,
          orderVietnameseName.trim().length
        );

        await this.birdOrderService.create(birdOrder);
        console.log(`Inserted: ${orderName} - ${orderVietnameseName}`);
      } else {
        console.log(`Skipped duplicate entry: ${orderName}`);
      }
    } catch (error) {
      console.error('Error inserting data:', error.message);
    }
  }
}
