"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRoutes = void 0;
var role_controller_1 = require("../controller/role.controller");
var auth_middleware_1 = require("../shared/middlewares/auth.middleware");
var role_middleware_1 = require("../shared/middlewares/role.middleware");
exports.RoleRoutes = [
    {
        method: "get",
        route: "/roles",
        controller: role_controller_1.RoleController,
        action: "getAll",
        middleware: [auth_middleware_1.verifyAdmin],
    },
    {
        method: "get",
        route: "/roles/:id",
        controller: role_controller_1.RoleController,
        action: "findOne",
        middleware: [auth_middleware_1.verifyAdmin],
    },
    {
        method: "post",
        route: "/roles",
        controller: role_controller_1.RoleController,
        action: "save",
        middleware: [role_middleware_1.validateRole, auth_middleware_1.verifyAdmin],
    },
    {
        method: "put",
        route: "/roles/:id",
        controller: role_controller_1.RoleController,
        action: "update",
        middleware: [role_middleware_1.validateRole, auth_middleware_1.verifyAdmin],
    },
    {
        method: "delete",
        route: "/roles/:id",
        controller: role_controller_1.RoleController,
        action: "remove",
        middleware: [auth_middleware_1.verifyAdmin],
    },
];
//# sourceMappingURL=role.routes.js.map