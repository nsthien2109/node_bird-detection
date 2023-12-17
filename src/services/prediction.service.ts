import { AppDataSource } from "../data-source";

import { Bird, History, Prediction } from "../entity";
import { PredictionResult } from "../types/prediction.type";

import * as fs from "fs";
import * as csv from "csv-parser";

import axios from "axios";
import * as cloudinary from "cloudinary";

export class PredictionService {
  constructor(
    private birdRepository = AppDataSource.getRepository(Bird),
    private historyRepository = AppDataSource.getRepository(History),
    private predictionRepository = AppDataSource.getRepository(Prediction)
  ) {}

  async create(data: Prediction) {
    return await this.predictionRepository.save(data);
  }

  async findByHistoryId(idHistory: number) {
    return await this.predictionRepository.findBy({
      history: { id: idHistory },
    });
  }

  async remove(id: number) {
    return await this.predictionRepository.delete(id);
  }

  async prediction(url: string) {
    return await axios
      .post(process.env.FLASK_API_PREDICTION, {
        url,
      })
      .then(async (result) => {
        const predict = result.data;
        let top5Birds = [];
        for (const predictElement of predict) {
          const bird = await this.birdRepository.findOne({
            where: { id: predictElement.predicted_id },
          });

          const birdUrls = await cloudinary.v2.api.resources({
            type: "upload",
            prefix: `birds_upload/${predictElement.class_name}`,
          });

          const imageUrl = birdUrls.resources.map((item: any) => item.url);

          top5Birds.push({
            ...bird,
            confidence: predictElement.confidence,
            images: imageUrl,
          });
        }

        return top5Birds;
      })
      .catch((err) => {
        console.log("Check : ", err);

        return err;
      });
  }
}
