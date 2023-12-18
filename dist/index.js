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
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var compression = require("compression");
var cors = require("cors");
var dotenv = require("dotenv");
dotenv.config();
var data_source_1 = require("./data-source");
var routes_1 = require("./routes");
var none_middleware_1 = require("./shared/middlewares/none.middleware");
var cloudinary = require("cloudinary");
cloudinary.v2.config({
    cloud_name: 'dmzvudfg5',
    api_key: '614921592645376',
    api_secret: 'L98LhofuulpSFiErE_pB0G8in_g',
    secure: true,
});
var app = express();
data_source_1.AppDataSource.initialize()
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    var endpoints;
    return __generator(this, function (_a) {
        // create express app
        app.use(cors());
        app.use(compression());
        app.use(cookieParser());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        endpoints = __spreadArray([], routes_1.Routes.map(function (route) { return "".concat(route.method, " ========> /api").concat(route.route); }), true);
        console.log(endpoints);
        // register express routes from defined application routes
        app.get('/', function (request, response) {
            return response.send('Welcome to Njha');
        });
        routes_1.Routes.forEach(function (route) {
            var _a;
            app[route.method]("/api".concat(route.route), ((_a = route.middleware) === null || _a === void 0 ? void 0 : _a.length) > 0 ? __spreadArray([], route.middleware, true) : none_middleware_1.noneMiddleware, function (req, res, next) {
                var result = new route.controller()[route.action](req, res, next);
                if (result instanceof Promise) {
                    result.then(function (result) {
                        return result !== null && result !== undefined ? result : undefined;
                    });
                }
                else if (result !== null && result !== undefined) {
                    result;
                }
            });
        });
        // start express server
        app.listen(8080, function () {
            console.log('Express server has started on port : 8080');
        });
        return [2 /*return*/];
    });
}); })
    .catch(function (error) { return console.log(error); });
exports.default = app;
//# sourceMappingURL=index.js.map