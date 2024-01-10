import { Request, Response } from "express";
import { BirdService } from "../services/bird.service";
import * as cloudinary from "cloudinary";
import * as fs from "fs";
import csvParser = require("csv-parser");
import { BirdOrderService } from "../services/bird-order.service";
import { BirdFamilyService } from "../services/bird-family.service";
import { BirdStatusService } from "../services/bird-status.service";

export class BirdController {
  private birdService = new BirdService();
  private birdOrderService = new BirdOrderService();
  private birdFamilyService = new BirdFamilyService();
  private birdStatusService = new BirdStatusService();

  async getAll(request: Request, response: Response) {
    const page = Number(request.query.page) || 1;
    const pageSize = Number(request.query.pageSize) || 10;
    try {
      const [data, total] = await this.birdService.findAll(page, pageSize);
      const totalPages = Math.ceil(total / pageSize);

      const results = await Promise.all(
        data.map(async (item) => {
          const birdUrls = await cloudinary.v2.api.resources({
            type: "upload",
            prefix: `birds_upload/${item.class_name}`,
          });
          item["images"] = birdUrls.resources.map((item: any) => item.url);
          return { ...item };
        })
      ).catch((e) => {
        console.log(e);
      });

      return response.status(200).json({
        results,
        total,
        page,
        pageSize,
        totalPages,
      });
    } catch (error) {
      return response.status(500).json({ error: error });
    }
  }

  async findOne(request: Request, response: Response) {
    const id: number = parseInt(request.params.id);
    const bird = await this.birdService.findById(id);
    if (!bird) {
      return response.status(404).json({ error: "Bird not found" });
    } else {
      const birdUrls = await cloudinary.v2.api.resources({
        type: "upload",
        prefix: `birds_upload/${bird.class_name}`,
      });
      bird["images"] = birdUrls.resources.map((item: any) => item.url);
      return response.status(200).json(bird);
    }
  }

  async fillData() {
    const csvStream = fs
      .createReadStream(__dirname + "/temp/birdss.csv", "utf-8")
      .pipe(csvParser());

    for await (const csvRow of csvStream) {
      await this.updateData(csvRow);
    }
  }

  async updateData(csvRow: any) {
    const {
      id,
      common_name,
      vietnamese_name,
      scientific_name,
      bird_order,
      family,
      description,
      distribution,
      diet,
      conservation_status,
    } = csvRow;

    const existingBird = await this.birdService.findById(parseInt(id));

    if (existingBird) {
      const birdOrders = await this.birdOrderService.findAll();
      const birdFamily = await this.birdFamilyService.findAll();
      const birdStatus = await this.birdStatusService.findAll();

      const matchingBirdOrder = birdOrders.find((order) =>
        bird_order.includes(order.orderName)
      );
      const matchingBirdFamily = birdFamily.find((fam) =>
        family.includes(fam.familyName)
      );
      const matchingBirdStatus = birdStatus.find((stt) =>
        conservation_status.includes(stt.statusName)
      );

      if (matchingBirdOrder) {
        existingBird.order = matchingBirdOrder;
      }

      if (matchingBirdFamily) {
        existingBird.family = matchingBirdFamily;
      }

      if (matchingBirdStatus) {
        existingBird.status = matchingBirdStatus;
      }
    }

    await this.birdService.save(existingBird);

    try {
    } catch (error) {
      console.error("Error inserting data:", error.message);
    }
  }
}
