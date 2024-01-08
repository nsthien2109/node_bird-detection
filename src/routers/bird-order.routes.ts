import { BirdOrderController } from "../controller/bird-order.controller";
import { RouteType } from "../types/route.type";
import { verifyAdmin } from "../shared/middlewares/auth.middleware";

export const BirdOrderRoute: RouteType[] = [
  {
    method: "get",
    route: "/orders",
    controller: BirdOrderController,
    action: "getAll",
  },
  {
    method: "get",
    route: "/orders/fill",
    controller: BirdOrderController,
    action: "fillData",
    middleware: [verifyAdmin],
  },
];
