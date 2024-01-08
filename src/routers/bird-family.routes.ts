import { BirdFamilyController } from "../controller/bird-family.controller";
import { RouteType } from "../types/route.type";
import { verifyAdmin } from "../shared/middlewares/auth.middleware";

export const BirdFamilyRoute: RouteType[] = [
  {
    method: "get",
    route: "/family",
    controller: BirdFamilyController,
    action: "getAll",
  },
  {
    method: "get",
    route: "/family/:id",
    controller: BirdFamilyController,
    action: "findOne",
  },
  {
    method: "get",
    route: "/family/fill",
    controller: BirdFamilyController,
    action: "fillData",
    middleware: [verifyAdmin],
  },
];
