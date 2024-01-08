import { BirdStatusController } from "../controller/bird-status.controller";
import { RouteType } from "../types/route.type";
import { verifyAdmin } from "../shared/middlewares/auth.middleware";

export const BirdStatusRoute: RouteType[] = [
  {
    method: "get",
    route: "/status",
    controller: BirdStatusController,
    action: "getAll",
  },
  {
    method: "get",
    route: "/status/:id",
    controller: BirdStatusController,
    action: "findOne",
  },
  {
    method: "get",
    route: "/status/fill",
    controller: BirdStatusController,
    action: "fillData",
    middleware: [verifyAdmin],
  },
];
