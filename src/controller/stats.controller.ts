import { UserService } from "../services/user.service";
import { HistoryService } from "../services/history.service";
import { BirdService } from "../services/bird.service";
import { Request, Response } from "express";
import { BirdFamilyService } from "../services/bird-family.service";
import { BirdStatusService } from "../services/bird-status.service";
import { BirdOrderService } from "../services/bird-order.service";

export class StatsController {
  private userService = new UserService();
  private historyService = new HistoryService();
  private birdService = new BirdService();
  private birdOrderService = new BirdOrderService();
  private birdStatusService = new BirdStatusService();
  private birdFamilyService = new BirdFamilyService();

  async getStats(request: Request, response: Response) {
    try {
      const user_count = await this.userService.count();
      const bird_count = await this.birdService.count();
      const history_count = await this.historyService.count();
      const family_count = await this.birdFamilyService.count();
      const order_count = await this.birdOrderService.count();
      const status_count = await this.birdStatusService.count();

      const data = {
        users: user_count,
        birds: bird_count,
        histories: history_count,
        families: family_count,
        orders: order_count,
        status: status_count,
      };

      return response.status(200).json({ ...data });
    } catch (error) {
      return response.status(500).json({ error: error });
    }
  }
}
