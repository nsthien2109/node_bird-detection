"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BirdRoute = void 0;
var bird_controller_1 = require("../controller/bird.controller");
exports.BirdRoute = [
    {
        method: "get",
        route: "/birds",
        controller: bird_controller_1.BirdController,
        action: "getAll",
    },
    {
        method: "get",
        route: "/birds/:id",
        controller: bird_controller_1.BirdController,
        action: "findOne",
    },
];
//# sourceMappingURL=bird.routes.js.map