import { RoleController } from "../controller/role.controller";
import { verifyAdmin } from "../shared/middlewares/auth.middleware";
import { validateRole } from "../shared/middlewares/role.middleware";
import { RouteType } from "../types/route.type";

export const RoleRoutes: RouteType[] = [
  {
    method: "get",
    route: "/roles",
    controller: RoleController,
    action: "getAll",
    middleware: [verifyAdmin],
  },
  {
    method: "get",
    route: "/roles/:id",
    controller: RoleController,
    action: "findOne",
    middleware: [verifyAdmin],
  },
  {
    method: "post",
    route: "/roles",
    controller: RoleController,
    action: "save",
    middleware: [validateRole, verifyAdmin],
  },
  {
    method: "put",
    route: "/roles/:id",
    controller: RoleController,
    action: "update",
    middleware: [validateRole, verifyAdmin],
  },
  {
    method: "delete",
    route: "/roles/:id",
    controller: RoleController,
    action: "remove",
    middleware: [verifyAdmin],
  },
];
