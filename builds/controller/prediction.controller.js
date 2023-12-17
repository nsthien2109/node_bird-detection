"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictionController = void 0;
var prediction_service_1 = require("../services/prediction.service");
var entity_1 = require("../entity");
var cloudinary = require("cloudinary");
var multer = require("multer");
var upload_middleware_1 = require("../shared/middlewares/upload.middleware");
var history_service_1 = require("../services/history.service");
var singleUpload = upload_middleware_1.default.single("file");
var PredictionController = /** @class */ (function () {
    function PredictionController() {
        this.predictionService = new prediction_service_1.PredictionService();
        this.historyService = new history_service_1.HistoryService();
    }
    PredictionController.prototype.fillData = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.predictionService.fillData()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, response.send("Completed")];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, response.status(500).json({ error: error_1 })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PredictionController.prototype.uploadImageToCloud = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var b64, dataURI;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        b64 = Buffer.from(file.buffer).toString("base64");
                        dataURI = "data:" + file.mimetype + ";base64," + b64;
                        return [4 /*yield*/, cloudinary.v2.uploader.upload(dataURI, {
                                folder: "birds_prediction",
                                resource_type: "image",
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PredictionController.prototype.saveToHistory = function (url, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var history;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        history = new entity_1.History();
                        history.date = new Date();
                        history.url = url;
                        history.user = userId;
                        return [4 /*yield*/, this.historyService.create(history)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PredictionController.prototype.saveToPrediction = function (confidence, history, bird) {
        return __awaiter(this, void 0, void 0, function () {
            var pred;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pred = new entity_1.Prediction();
                        pred.confidence = confidence;
                        pred.history = history;
                        pred.bird = bird;
                        return [4 /*yield*/, this.predictionService.create(pred)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PredictionController.prototype.prediction = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            var _this = this;
            return __generator(this, function (_a) {
                user = request["user"];
                singleUpload(request, response, function (error) { return __awaiter(_this, void 0, void 0, function () {
                    var check, result, history, _i, result_1, item, error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!request.file || request.files) {
                                    return [2 /*return*/, response.status(412).json({ status: "ERR", msg: "Please choose your image" })];
                                }
                                if (error instanceof multer.MulterError && error.code === "LIMIT_UNEXPECTED_FILE") {
                                    return [2 /*return*/, response.status(400).json({ status: "ERR", msg: "Maximum of 1 image allowed" })];
                                }
                                else if (error instanceof multer.MulterError) {
                                    return [2 /*return*/, response.status(400).json({ status: "ERR", msg: error })];
                                }
                                return [4 /*yield*/, this.uploadImageToCloud(request.file)];
                            case 1:
                                check = _a.sent();
                                _a.label = 2;
                            case 2:
                                _a.trys.push([2, 9, , 10]);
                                return [4 /*yield*/, this.predictionService.prediction(check.url)];
                            case 3:
                                result = _a.sent();
                                console.log(user);
                                if (!(user && result.length === 5)) return [3 /*break*/, 8];
                                console.log("OK");
                                return [4 /*yield*/, this.saveToHistory(check.url, user)];
                            case 4:
                                history = _a.sent();
                                _i = 0, result_1 = result;
                                _a.label = 5;
                            case 5:
                                if (!(_i < result_1.length)) return [3 /*break*/, 8];
                                item = result_1[_i];
                                return [4 /*yield*/, this.saveToPrediction(item.confidence, history.id, item.id)];
                            case 6:
                                _a.sent();
                                _a.label = 7;
                            case 7:
                                _i++;
                                return [3 /*break*/, 5];
                            case 8: return [2 /*return*/, response.status(200).json(result)];
                            case 9:
                                error_2 = _a.sent();
                                return [2 /*return*/, response.status(500).json({ error: error_2 })];
                            case 10: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    return PredictionController;
}());
exports.PredictionController = PredictionController;
//# sourceMappingURL=prediction.controller.js.map