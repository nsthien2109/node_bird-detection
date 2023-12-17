import {UserService} from "../services/user.service";
import {HistoryService} from "../services/history.service";
import {BirdService} from "../services/bird.service";
import {Request, Response} from "express";

export class StatsController {
  private userService = new UserService();
  private historyService = new HistoryService();
  private birdService = new BirdService();

  async getStats(request: Request, response: Response) {
    try {
      const user_count = await this.userService.count();
      const bird_count = await this.birdService.count();
      const history_count = await this.historyService.count();

      const data = {
        users: user_count,
        birds: bird_count,
        histories: history_count,
      };

      return response.status(200).json({  ...data });
    } catch (error) {
      return response.status(500).json({ error: error });
    }
  }
}
