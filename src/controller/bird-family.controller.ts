import * as readline from "readline";
import * as fs from "fs";
import { Request, Response } from "express";

import { BirdFamilyService } from "../services/bird-family.service";
import { BirdFamily } from "../entity/bird-family";
import { removeSpecialCharacters } from "../shared/utils/string";
export class BirdFamilyController {
  private birdFamilyService = new BirdFamilyService();

  async getAll(request: Request, response: Response) {
    try {
      const result = await this.birdFamilyService.findAll();
      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({ error });
    }
  }

  async findOne(request: Request, response: Response) {
    const id: number = parseInt(request.params.id);
    const family = await this.birdFamilyService.findById(id);
    if (!family) {
      return response.status(404).json({ error: "Family not found" });
    } else {
      return response.status(200).json(family);
    }
  }

  // Danger - fill data update  ============================== WARNING FBI ==================================
  async fillData() {
    const rl = readline.createInterface({
      input: fs.createReadStream(__dirname + "/temp/family.csv", "utf-8"),
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      const [familyName, familyVietnameseName] = line.split("-");
      await this.updateData(familyName, familyVietnameseName);
    }
  }

  async updateData(familyName: string, familyVietnameseName: string) {
    try {
      // Check for existing entry with the same orderName
      const existingOrder = await this.birdFamilyService.findByName(familyName);

      if (!existingOrder) {
        const birdFamily = new BirdFamily();
        birdFamily.familyName = removeSpecialCharacters(familyName);
        birdFamily.familyVietnameseName = familyVietnameseName
          ? removeSpecialCharacters(familyVietnameseName)
          : `Họ ${removeSpecialCharacters(familyName)}`;

        await this.birdFamilyService.create(birdFamily);
        console.log(`Inserted: ${familyName} - ${familyVietnameseName}`);
      } else {
        console.log(`Skipped duplicate entry: ${familyName}`);
      }
    } catch (error) {
      console.error("Error inserting data:", error.message);
    }
  }
}
