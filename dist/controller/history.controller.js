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
exports.HistoryController = void 0;
var history_service_1 = require("../services/history.service");
var user_service_1 = require("../services/user.service");
var prediction_service_1 = require("../services/prediction.service");
var HistoryController = /** @class */ (function () {
    function HistoryController() {
        this.historyService = new history_service_1.HistoryService();
        this.predictionService = new prediction_service_1.PredictionService();
        this.userService = new user_service_1.UserService();
    }
    HistoryController.prototype.getAll = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var result, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.historyService.findAll()];
                    case 1:
                        result = _a.sent();
                        data = result.map(function (item) {
                            delete item["user"]["password"];
                            return item;
                        });
                        return [2 /*return*/, response.status(200).json(data)];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, response.status(500).json({ error: error_1 })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HistoryController.prototype.findByUser = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var auth, user, histories;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        auth = request["user"];
                        return [4 /*yield*/, this.userService.findById(auth.id)];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.historyService.findByUser(user)];
                    case 2:
                        histories = _a.sent();
                        return [2 /*return*/, response.status(200).json(histories)];
                    case 3: return [2 /*return*/, response.status(500).json({ error: "You're not permission !" })];
                }
            });
        });
    };
    HistoryController.prototype.findByIdUser = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var auth, id, user, histories;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        auth = request["user"];
                        if (!(auth.role.id === 1)) return [3 /*break*/, 4];
                        id = parseInt(request.params.id);
                        return [4 /*yield*/, this.userService.findById(id)];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.historyService.findByUser(user)];
                    case 2:
                        histories = _a.sent();
                        return [2 /*return*/, response.status(200).json(histories)];
                    case 3: return [2 /*return*/, response.status(404).json({ error: "User not found !" })];
                    case 4: return [2 /*return*/, response.status(500).json({ error: "You're not permission !" })];
                }
            });
        });
    };
    HistoryController.prototype.remove = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var auth, id, user, histories, _i, histories_1, item, predictions, _a, predictions_1, pred, error_2, predictions, _b, predictions_2, pred, error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        auth = request["user"];
                        id = parseInt(request.params.id);
                        return [4 /*yield*/, this.userService.findById(auth.id)];
                    case 1:
                        user = _c.sent();
                        if (!user) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.historyService.findByUser(user)];
                    case 2:
                        histories = _c.sent();
                        _i = 0, histories_1 = histories;
                        _c.label = 3;
                    case 3:
                        if (!(_i < histories_1.length)) return [3 /*break*/, 12];
                        item = histories_1[_i];
                        if (!(item.id === id)) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.predictionService.findByHistoryId(id)];
                    case 4:
                        predictions = _c.sent();
                        if (!(predictions.length > 0)) return [3 /*break*/, 11];
                        _a = 0, predictions_1 = predictions;
                        _c.label = 5;
                    case 5:
                        if (!(_a < predictions_1.length)) return [3 /*break*/, 8];
                        pred = predictions_1[_a];
                        return [4 /*yield*/, this.predictionService.remove(pred.id)];
                    case 6:
                        _c.sent();
                        _c.label = 7;
                    case 7:
                        _a++;
                        return [3 /*break*/, 5];
                    case 8:
                        _c.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, this.historyService.remove(id)];
                    case 9:
                        _c.sent();
                        return [2 /*return*/, response
                                .status(200)
                                .json({ message: "Delete successfully !" })];
                    case 10:
                        error_2 = _c.sent();
                        return [2 /*return*/, response.status(500).json({ error: error_2 })];
                    case 11:
                        _i++;
                        return [3 /*break*/, 3];
                    case 12: return [3 /*break*/, 23];
                    case 13:
                        if (!(auth.role.id === 1)) return [3 /*break*/, 22];
                        return [4 /*yield*/, this.predictionService.findByHistoryId(id)];
                    case 14:
                        predictions = _c.sent();
                        if (!(predictions.length > 0)) return [3 /*break*/, 21];
                        _b = 0, predictions_2 = predictions;
                        _c.label = 15;
                    case 15:
                        if (!(_b < predictions_2.length)) return [3 /*break*/, 18];
                        pred = predictions_2[_b];
                        return [4 /*yield*/, this.predictionService.remove(pred.id)];
                    case 16:
                        _c.sent();
                        _c.label = 17;
                    case 17:
                        _b++;
                        return [3 /*break*/, 15];
                    case 18:
                        _c.trys.push([18, 20, , 21]);
                        return [4 /*yield*/, this.historyService.remove(id)];
                    case 19:
                        _c.sent();
                        return [2 /*return*/, response
                                .status(200)
                                .json({ message: "Delete successfully !" })];
                    case 20:
                        error_3 = _c.sent();
                        return [2 /*return*/, response.status(500).json({ error: error_3 })];
                    case 21: return [3 /*break*/, 23];
                    case 22: return [2 /*return*/, response.status(500).json({ error: "You're not permission !" })];
                    case 23: return [2 /*return*/];
                }
            });
        });
    };
    return HistoryController;
}());
exports.HistoryController = HistoryController;
//# sourceMappingURL=history.controller.js.map