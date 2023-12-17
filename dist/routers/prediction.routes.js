"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictionRoutes = void 0;
var prediction_controller_1 = require("../controller/prediction.controller");
exports.PredictionRoutes = [
    {
        method: "post",
        route: "/prediction",
        controller: prediction_controller_1.PredictionController,
        action: "prediction",
    },
];
//# sourceMappingURL=prediction.routes.js.map