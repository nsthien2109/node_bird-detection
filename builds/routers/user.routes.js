"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
var user_controller_1 = require("../controller/user.controller");
exports.UserRoutes = [
    {
        method: "get",
        route: "/users",
        controller: user_controller_1.UserController,
        action: "getAll",
    },
    {
        method: "get",
        route: "/users/:id",
        controller: user_controller_1.UserController,
        action: "findOne",
    },
    {
        method: "delete",
        route: "/users/:id",
        controller: user_controller_1.UserController,
        action: "remove",
    },
    {
        method: "put",
        route: "/users/:id",
        controller: user_controller_1.UserController,
        action: "update",
    },
];
//# sourceMappingURL=user.routes.js.map