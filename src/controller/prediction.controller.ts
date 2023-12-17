import { PredictionService } from "../services/prediction.service";
import { Request, Response } from "express";
import { History, User, Prediction, Bird } from "../entity";
import * as cloudinary from "cloudinary";
import * as multer from "multer";

import upload from "../shared/middlewares/upload.middleware";
import { HistoryService } from "../services/history.service";

let singleUpload = upload.single("file");

export class PredictionController {
  private predictionService = new PredictionService();
  private historyService = new HistoryService();

  async fillData(request: Request, response: Response) {
    try {
      const result = await this.predictionService.fillData();
      return response.send("Completed");
    } catch (error) {
      return response.status(500).json({ error: error });
    }
  }

  async uploadImageToCloud(file: Express.Multer.File) {
    const b64 = Buffer.from(file.buffer).toString("base64");
    let dataURI = "data:" + file.mimetype + ";base64," + b64;
    return await cloudinary.v2.uploader.upload(dataURI, {
      folder: "birds_prediction",
      resource_type: "image",
    });
  }

  async saveToHistory(url: string, userId: User) {
    const history = new History();
    history.date = new Date();
    history.url = url;
    history.user = userId;
    return await this.historyService.create(history);
  }

  async saveToPrediction(confidence: number, history: any, bird: any) {
    const pred = new Prediction();
    pred.confidence = confidence;
    pred.history = history;
    pred.bird = bird;
    await this.predictionService.create(pred);
  }

  async prediction(request: Request, response: Response) {
    const user = request["user"];

    singleUpload(request, response, async (error) => {
      if (!request.file || request.files) {
        return response.status(412).json({ status: "ERR", msg: "Please choose your image" });
      }
      if (error instanceof multer.MulterError && error.code === "LIMIT_UNEXPECTED_FILE") {
        return response.status(400).json({ status: "ERR", msg: `Maximum of 1 image allowed` });
      } else if (error instanceof multer.MulterError) {
        return response.status(400).json({ status: "ERR", msg: error });
      }
      const check = await this.uploadImageToCloud(request.file);
      try {
        const result = await this.predictionService.prediction(check.url);
        console.log(user);

        if (user && result.length === 5) {
          console.log("OK");

          const history = await this.saveToHistory(check.url, user);
          for (const item of result) {
            await this.saveToPrediction(item.confidence, history.id, item.id);
          }
        }
        return response.status(200).json(result);
      } catch (error) {
        return response.status(500).json({ error: error });
      }
    });
  }
}
