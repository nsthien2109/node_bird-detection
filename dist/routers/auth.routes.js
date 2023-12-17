"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
var auth_controller_1 = require("../controller/auth.controller");
var auth_middleware_1 = require("../shared/middlewares/auth.middleware");
exports.AuthRoute = [
    {
        method: "post",
        route: "/auth/register",
        controller: auth_controller_1.AuthController,
        action: "register",
        middleware: [auth_middleware_1.validateRegisterData],
    },
    {
        method: "post",
        route: "/auth/login",
        controller: auth_controller_1.AuthController,
        action: "login",
        middleware: [auth_middleware_1.validateLoginData],
    },
];
//# sourceMappingURL=auth.routes.js.map