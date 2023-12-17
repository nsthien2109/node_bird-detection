import { RouteType } from "../types/route.type";
import { StatsController } from "../controller/stats.controller";
import { verifyAdmin } from "../shared/middlewares/auth.middleware";

export const StatsRoutes: RouteType[] = [
  {
    method: "get",
    route: "/stats",
    controller: StatsController,
    action: "getStats",
    middleware: [verifyAdmin],
  },
];
