"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Multer = require("multer");
var storage = Multer.memoryStorage();
// combine them to a function upload
var upload = Multer({ storage: storage });
exports.default = upload;
//# sourceMappingURL=upload.middleware.js.map