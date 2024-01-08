import * as readline from 'readline';
import * as fs from 'fs';
import { BirdStatusService } from '../services/bird-status.service';
import { BirdStatus } from '../entity/bird-status';
export class BirdStatusController {
  private birdStatusService = new BirdStatusService();

  async fillData() {
    const rl = readline.createInterface({
      input: fs.createReadStream(
        __dirname + '/temp/conservation_status.csv',
        'utf-8'
      ),
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      const [statusName, statusVietnameseName] = line.split('-');
      await this.updateData(statusName, statusVietnameseName);
    }
  }

  async updateData(statusName: string, statusVietnameseName: string) {
    try {
      // Check for existing entry with the same orderName
      const existingOrder = await this.birdStatusService.findByName(statusName);

      if (!existingOrder) {
        const birdStatus = new BirdStatus();
        birdStatus.statusName = statusName.slice(1, statusName.trim().length);
        birdStatus.statusVietnameseName = statusVietnameseName.slice(
          0,
          statusVietnameseName.trim().length
        );

        await this.birdStatusService.create(birdStatus);
        console.log(`Inserted: ${statusName} - ${statusVietnameseName}`);
      } else {
        console.log(`Skipped duplicate entry: ${statusName}`);
      }
    } catch (error) {
      console.error('Error inserting data:', error.message);
    }
  }
}
