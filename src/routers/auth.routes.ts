import { AuthController } from "../controller/auth.controller";
import {
  validateLoginData,
  validateRegisterData,
} from "../shared/middlewares/auth.middleware";
import { RouteType } from "../types/route.type";

export const AuthRoute: RouteType[] = [
  {
    method: "post",
    route: "/auth/register",
    controller: AuthController,
    action: "register",
    middleware: [validateRegisterData],
  },
  {
    method: "post",
    route: "/auth/login",
    controller: AuthController,
    action: "login",
    middleware: [validateLoginData],
  },
];
