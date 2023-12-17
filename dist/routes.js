"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
var auth_routes_1 = require("./routers/auth.routes");
var bird_routes_1 = require("./routers/bird.routes");
var prediction_routes_1 = require("./routers/prediction.routes");
var role_routes_1 = require("./routers/role.routes");
var user_routes_1 = require("./routers/user.routes");
var stats_routes_1 = require("./routers/stats.routes");
var history_routes_1 = require("./routers/history.routes");
exports.Routes = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], role_routes_1.RoleRoutes, true), user_routes_1.UserRoutes, true), auth_routes_1.AuthRoute, true), bird_routes_1.BirdRoute, true), prediction_routes_1.PredictionRoutes, true), history_routes_1.HistoryRoute, true), stats_routes_1.StatsRoutes, true);
//# sourceMappingURL=routes.js.map