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
exports.verifyAdmin = exports.verifyToken = exports.validateLoginData = exports.validateRegisterData = void 0;
var class_validator_1 = require("class-validator");
var auth_dto_1 = require("../../dto/auth.dto");
var jwt = require("jsonwebtoken");
var tokenBlacklist = new Set();
var validateRegisterData = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, username, password, isActive, verifyBy, role, user, error_1, message;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, username = _a.username, password = _a.password, isActive = _a.isActive, verifyBy = _a.verifyBy, role = _a.role;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                user = new auth_dto_1.RegisterDTO();
                user.email = email;
                user.username = username;
                user.password = password;
                user.role = role;
                return [4 /*yield*/, (0, class_validator_1.validateOrReject)(user)];
            case 2:
                _b.sent();
                next();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                message = Object.values(error_1[0].constraints)[0];
                res.status(400).send({ message: message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.validateRegisterData = validateRegisterData;
var validateLoginData = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, data, error_2, message;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                data = new auth_dto_1.LoginDTO();
                data.email = email;
                data.password = password;
                return [4 /*yield*/, (0, class_validator_1.validateOrReject)(data)];
            case 2:
                _b.sent();
                next();
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                message = Object.values(error_2[0].constraints)[0];
                res.status(400).send({ message: message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.validateLoginData = validateLoginData;
var verifyToken = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token;
    var _a;
    return __generator(this, function (_b) {
        token = (_a = request.header("Authorization")) === null || _a === void 0 ? void 0 : _a.substring(7);
        if (!token) {
            return [2 /*return*/, response.status(401).json({ error: "You are not authorized !" })];
        }
        // Verify and decode the token
        jwt.verify(token, process.env.SECRET_KEY, function (error, decoded) {
            if (error) {
                if (error.name === "TokenExpiredError") {
                    return response.status(401).json({ message: "Token has expired." });
                }
                else {
                    return response
                        .status(403)
                        .json({ message: "Access denied. Invalid token." });
                }
            }
            request["user"] = decoded;
            next();
        });
        return [2 /*return*/];
    });
}); };
exports.verifyToken = verifyToken;
var verifyAdmin = function (request, response, next) {
    var _a;
    var token = (_a = request.header("Authorization")) === null || _a === void 0 ? void 0 : _a.substring(7);
    if (!token) {
        return response.status(401).json({ error: "You are not authorized !" });
    }
    jwt.verify(token, process.env.SECRET_KEY, function (error, decoded) {
        if (error) {
            if (error.name === "TokenExpiredError") {
                return response.status(401).json({ message: "Token has expired." });
            }
            else {
                return response
                    .status(403)
                    .json({ message: "Access denied. Invalid token." });
            }
        }
        if (decoded["role"] === 1) {
            request["user"] = decoded;
            next();
        }
        else {
            return response.status(403).json({ message: "Permission denied." });
        }
    });
};
exports.verifyAdmin = verifyAdmin;
//# sourceMappingURL=auth.middleware.js.map