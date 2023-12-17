"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prediction = void 0;
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var history_1 = require("./history");
var bird_1 = require("./bird");
var Prediction = /** @class */ (function () {
    function Prediction() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Prediction.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsNumber)(),
        __metadata("design:type", Number)
    ], Prediction.prototype, "confidence", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return history_1.History; }, function (history) { return history.id; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", history_1.History)
    ], Prediction.prototype, "history", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return bird_1.Bird; }, function (bird) { return bird.id; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", bird_1.Bird)
    ], Prediction.prototype, "bird", void 0);
    Prediction = __decorate([
        (0, typeorm_1.Entity)()
    ], Prediction);
    return Prediction;
}());
exports.Prediction = Prediction;
//# sourceMappingURL=prediction.js.map