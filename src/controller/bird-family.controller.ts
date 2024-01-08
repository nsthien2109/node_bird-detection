import * as readline from 'readline';
import * as fs from 'fs';
import { BirdFamilyService } from '../services/bird-family.service';
import { BirdFamily } from '../entity/bird-family';
export class BirdFamilyController {
  private birdFamilyService = new BirdFamilyService();

  async fillData() {
    const rl = readline.createInterface({
      input: fs.createReadStream(__dirname + '/temp/family.csv', 'utf-8'),
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      const [familyName, familyVietnameseName] = line.split('-');
      await this.updateData(familyName, familyVietnameseName);
    }
  }

  async updateData(familyName: string, familyVietnameseName: string) {
    console.log('Check : ', familyName, familyVietnameseName);

    try {
      // Check for existing entry with the same orderName
      const existingOrder = await this.birdFamilyService.findByName(familyName);

      if (!existingOrder) {
        const birdFamily = new BirdFamily();
        birdFamily.familyName = familyName.slice(1, familyName.trim().length);
        birdFamily.familyVietnameseName =
          familyVietnameseName.slice(0, familyVietnameseName.trim().length) ??
          null;

        await this.birdFamilyService.create(birdFamily);
        console.log(`Inserted: ${familyName} - ${familyVietnameseName}`);
      } else {
        console.log(`Skipped duplicate entry: ${familyName}`);
      }
    } catch (error) {
      console.error('Error inserting data:', error.message);
    }
  }
}
