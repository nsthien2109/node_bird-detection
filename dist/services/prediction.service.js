"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.PredictionService = void 0;
var data_source_1 = require("../data-source");
var entity_1 = require("../entity");
var axios_1 = require("axios");
var cloudinary = require("cloudinary");
var PredictionService = /** @class */ (function () {
    function PredictionService(birdRepository, historyRepository, predictionRepository) {
        if (birdRepository === void 0) { birdRepository = data_source_1.AppDataSource.getRepository(entity_1.Bird); }
        if (historyRepository === void 0) { historyRepository = data_source_1.AppDataSource.getRepository(entity_1.History); }
        if (predictionRepository === void 0) { predictionRepository = data_source_1.AppDataSource.getRepository(entity_1.Prediction); }
        this.birdRepository = birdRepository;
        this.historyRepository = historyRepository;
        this.predictionRepository = predictionRepository;
    }
    PredictionService.prototype.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.predictionRepository.save(data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PredictionService.prototype.findByHistoryId = function (idHistory) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.predictionRepository.findBy({
                            history: { id: idHistory },
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PredictionService.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.predictionRepository.delete(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PredictionService.prototype.prediction = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default
                            .post(process.env.FLASK_API_PREDICTION, {
                            url: url,
                        })
                            .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                            var predict, top5Birds, _i, predict_1, predictElement, bird, birdUrls, imageUrl;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        predict = result.data;
                                        top5Birds = [];
                                        _i = 0, predict_1 = predict;
                                        _a.label = 1;
                                    case 1:
                                        if (!(_i < predict_1.length)) return [3 /*break*/, 5];
                                        predictElement = predict_1[_i];
                                        return [4 /*yield*/, this.birdRepository.findOne({
                                                where: { id: predictElement.predicted_id },
                                            })];
                                    case 2:
                                        bird = _a.sent();
                                        return [4 /*yield*/, cloudinary.v2.api.resources({
                                                type: "upload",
                                                prefix: "birds_upload/".concat(predictElement.class_name),
                                            })];
                                    case 3:
                                        birdUrls = _a.sent();
                                        imageUrl = birdUrls.resources.map(function (item) { return item.url; });
                                        top5Birds.push(__assign(__assign({}, bird), { confidence: predictElement.confidence, images: imageUrl }));
                                        _a.label = 4;
                                    case 4:
                                        _i++;
                                        return [3 /*break*/, 1];
                                    case 5: return [2 /*return*/, top5Birds];
                                }
                            });
                        }); })
                            .catch(function (err) {
                            console.log("Check : ", err);
                            return err;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return PredictionService;
}());
exports.PredictionService = PredictionService;
//# sourceMappingURL=prediction.service.js.map