import * as readline from "readline";
import * as fs from "fs";
import { Request, Response } from "express";

import { BirdStatusService } from "../services/bird-status.service";
import { BirdStatus } from "../entity/bird-status";
import { removeSpecialCharacters } from "../shared/utils/string";
export class BirdStatusController {
  private birdStatusService = new BirdStatusService();

  async getAll(request: Request, response: Response) {
    try {
      const result = await this.birdStatusService.findAll();
      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({ error });
    }
  }

  async findOne(request: Request, response: Response) {
    const id: number = parseInt(request.params.id);
    const status = await this.birdStatusService.findById(id);
    if (!status) {
      return response.status(404).json({ error: "Status not found" });
    } else {
      return response.status(200).json(status);
    }
  }

  // Danger - fill data update  ============================== WARNING FBI ==================================

  async fillData() {
    const rl = readline.createInterface({
      input: fs.createReadStream(__dirname + "/temp/conservation_status.csv", "utf-8"),
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      const [statusName, statusVietnameseName] = line.split("-");
      await this.updateData(statusName, statusVietnameseName);
    }
  }

  async updateData(statusName: string, statusVietnameseName: string) {
    try {
      // Check for existing entry with the same orderName
      const existingOrder = await this.birdStatusService.findByName(statusName);

      if (!existingOrder) {
        const birdStatus = new BirdStatus();
        birdStatus.statusName = removeSpecialCharacters(statusName);
        birdStatus.statusVietnameseName = removeSpecialCharacters(statusVietnameseName);

        await this.birdStatusService.create(birdStatus);
        console.log(`Inserted: ${statusName} - ${statusVietnameseName}`);
      } else {
        console.log(`Skipped duplicate entry: ${statusName}`);
      }
    } catch (error) {
      console.error("Error inserting data:", error.message);
    }
  }
}
