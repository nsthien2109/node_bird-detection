"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryRoute = void 0;
var history_controller_1 = require("../controller/history.controller");
var auth_middleware_1 = require("../shared/middlewares/auth.middleware");
exports.HistoryRoute = [
    {
        method: "get",
        route: "/histories",
        controller: history_controller_1.HistoryController,
        action: "getAll",
        middleware: [],
    },
    {
        method: "get",
        route: "/histories/user",
        controller: history_controller_1.HistoryController,
        action: "findByUser",
        middleware: [auth_middleware_1.verifyToken],
    },
    {
        method: "get",
        route: "/histories/user/:id",
        controller: history_controller_1.HistoryController,
        action: "findByIdUser",
        middleware: [auth_middleware_1.verifyAdmin],
    },
    {
        method: "delete",
        route: "/histories/:id",
        controller: history_controller_1.HistoryController,
        action: "remove",
        middleware: [auth_middleware_1.verifyToken],
    },
];
//# sourceMappingURL=history.routes.js.map