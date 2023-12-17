"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var configPublic = function (app) {
    app.use(express.static("./src/public/"));
};
exports.default = configPublic;
//# sourceMappingURL=config.js.map