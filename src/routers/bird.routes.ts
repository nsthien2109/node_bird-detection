import { BirdController } from "../controller/bird.controller";
import { verifyAdmin } from "../shared/middlewares/auth.middleware";
import { RouteType } from "../types/route.type";

export const BirdRoute: RouteType[] = [
  {
    method: "get",
    route: "/birds",
    controller: BirdController,
    action: "getAll",
  },
  {
    method: "get",
    route: "/birds/:id",
    controller: BirdController,
    action: "findOne",
  },
];
