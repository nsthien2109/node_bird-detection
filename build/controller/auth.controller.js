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
exports.AuthController = void 0;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var entity_1 = require("../entity");
var user_service_1 = require("../services/user.service");
var auth_service_1 = require("../services/auth.service");
var AuthController = /** @class */ (function () {
    function AuthController() {
        this.authService = new auth_service_1.AuthService();
        this.userService = new user_service_1.UserService();
    }
    AuthController.prototype.register = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var hashedPassword, user, isExistEmail, isExistUsername, result, token, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt.hash(request.body.password, 10)];
                    case 1:
                        hashedPassword = _a.sent();
                        user = new entity_1.User();
                        user.email = request.body.email;
                        user.username = request.body.username;
                        user.password = hashedPassword;
                        user.isActive = request.body.isActive;
                        user.role = request.body.role;
                        return [4 /*yield*/, this.userService.findByEmail(user.email)];
                    case 2:
                        isExistEmail = _a.sent();
                        return [4 /*yield*/, this.userService.findByUsername(user.username)];
                    case 3:
                        isExistUsername = _a.sent();
                        if (isExistEmail) {
                            return [2 /*return*/, response.status(409).json({ error: "Email already exist !" })];
                        }
                        if (isExistUsername) {
                            return [2 /*return*/, response.status(409).json({ error: "Username already exist !" })];
                        }
                        user.createdAt = new Date();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 8, , 9]);
                        return [4 /*yield*/, this.authService.register(user)];
                    case 5:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.generateToken(result.id, result.username, result.role)];
                    case 6:
                        token = _a.sent();
                        return [2 /*return*/, response.status(200).json({
                                accessToken: token,
                                data: result,
                            })];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2 /*return*/, response.status(500).json({ error: error_1 })];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.login = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user, match, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, this.userService.findByEmail(email)];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, response.status(404).json({ error: "Email is invalid !" })];
                        }
                        return [4 /*yield*/, bcrypt.compare(password, user.password)];
                    case 2:
                        match = _b.sent();
                        if (!match) {
                            return [2 /*return*/, response
                                    .status(404)
                                    .json({ error: "Email or password invalid !" })];
                        }
                        console.log(user);
                        return [4 /*yield*/, this.generateToken(user.id, user.username, user.role)];
                    case 3:
                        token = _b.sent();
                        user.password = undefined;
                        return [2 /*return*/, response.status(200).json({
                                accessToken: token,
                                data: user,
                            })];
                }
            });
        });
    };
    AuthController.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    // Generate token
    AuthController.prototype.generateToken = function (userId, username, role) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                token = jwt.sign({ id: userId, username: username, role: role.id }, process.env.SECRET_KEY, {
                    expiresIn: "1d",
                });
                return [2 /*return*/, token];
            });
        });
    };
    return AuthController;
}());
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map