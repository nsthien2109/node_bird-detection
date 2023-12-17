import { HistoryController } from "../controller/history.controller";
import {
  verifyAdmin,
  verifyToken,
} from "../shared/middlewares/auth.middleware";
import { RouteType } from "../types/route.type";

export const HistoryRoute: RouteType[] = [
  {
    method: "get",
    route: "/histories",
    controller: HistoryController,
    action: "getAll",
    middleware: [],
  },
  {
    method: "get",
    route: "/histories/user",
    controller: HistoryController,
    action: "findByUser",
    middleware: [verifyToken],
  },
  {
    method: "get",
    route: "/histories/user/:id",
    controller: HistoryController,
    action: "findByIdUser",
    middleware: [verifyAdmin],
  },
  {
    method: "delete",
    route: "/histories/:id",
    controller: HistoryController,
    action: "remove",
    middleware: [verifyToken],
  },
];
