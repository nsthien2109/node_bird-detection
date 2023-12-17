"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsRoutes = void 0;
var stats_controller_1 = require("../controller/stats.controller");
var auth_middleware_1 = require("../shared/middlewares/auth.middleware");
exports.StatsRoutes = [
    {
        method: "get",
        route: "/stats",
        controller: stats_controller_1.StatsController,
        action: "getStats",
        middleware: [auth_middleware_1.verifyAdmin],
    },
];
//# sourceMappingURL=stats.routes.js.map