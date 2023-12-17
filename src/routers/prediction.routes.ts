import { PredictionController } from "../controller/prediction.controller";
import { UserController } from "../controller/user.controller";
import { RouteType } from "../types/route.type";
import upload from "../shared/middlewares/upload.middleware";
import { verifyToken } from "../shared/middlewares/auth.middleware";
export const PredictionRoutes: RouteType[] = [
  {
    method: "post",
    route: "/prediction",
    controller: PredictionController,
    action: "prediction",
  },
];
