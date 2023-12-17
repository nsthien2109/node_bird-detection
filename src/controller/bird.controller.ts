import { Request, Response } from "express";
import { BirdService } from "../services/bird.service";
import * as cloudinary from "cloudinary";

export class BirdController {
  private birdService = new BirdService();
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
}
