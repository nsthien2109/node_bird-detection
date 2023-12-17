import { Request, Response } from "express";
import { HistoryService } from "../services/history.service";
import { UserService } from "../services/user.service";
import { User, History } from "../entity";
import { PredictionService } from "../services/prediction.service";

export class HistoryController {
  private historyService = new HistoryService();
  private predictionService = new PredictionService();

  private userService = new UserService();

  async getAll(request: Request, response: Response) {
    try {
      const result = await this.historyService.findAll();
      const data = result.map((item) => {
        delete item["user"]["password"];
        return item;
      });
      return response.status(200).json(data);
    } catch (error) {
      return response.status(500).json({ error: error });
    }
  }

  async findByUser(request: Request, response: Response) {
    const auth = request["user"];
    const user = await this.userService.findById(auth.id);
    if (user) {
      const histories = await this.historyService.findByUser(user);
      return response.status(200).json(histories);
    }

    return response.status(500).json({ error: "You're not permission !" });
  }

  async findByIdUser(request: Request, response: Response) {
    const auth = request["user"];
    if (auth.role.id === 1) {
      const id: number = parseInt(request.params.id);
      const user = await this.userService.findById(id);
      if (user) {
        const histories = await this.historyService.findByUser(user);
        return response.status(200).json(histories);
      }
      return response.status(404).json({ error: "User not found !" });
    }
    return response.status(500).json({ error: "You're not permission !" });
  }

  async remove(request: Request, response: Response) {
    const auth = request["user"];
    const id: number = parseInt(request.params.id);
    const user = await this.userService.findById(auth.id);
    if (user) {
      const histories = await this.historyService.findByUser(user);
      for (const item of histories) {
        if (item.id === id) {
          const predictions = await this.predictionService.findByHistoryId(id);
          if (predictions.length > 0) {
            for (const pred of predictions) {
              await this.predictionService.remove(pred.id);
            }
            try {
              await this.historyService.remove(id);
              return response
                .status(200)
                .json({ message: "Delete successfully !" });
            } catch (error) {
              return response.status(500).json({ error: error });
            }
          }
        }
      }
    } else if (auth.role.id === 1) {
      const predictions = await this.predictionService.findByHistoryId(id);
      if (predictions.length > 0) {
        for (const pred of predictions) {
          await this.predictionService.remove(pred.id);
        }
        try {
          await this.historyService.remove(id);
          return response
            .status(200)
            .json({ message: "Delete successfully !" });
        } catch (error) {
          return response.status(500).json({ error: error });
        }
      }
    } else {
      return response.status(500).json({ error: "You're not permission !" });
    }
  }
}
