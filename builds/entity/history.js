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
exports.History = void 0;
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var user_1 = require("./user");
var prediction_1 = require("./prediction");
var History = /** @class */ (function () {
    function History() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], History.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsDate)(),
        __metadata("design:type", Date)
    ], History.prototype, "date", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], History.prototype, "url", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return prediction_1.Prediction; }, function (prediction) { return prediction.history; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", Array)
    ], History.prototype, "predictions", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_1.User; }, function (user) { return user.id; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", user_1.User)
    ], History.prototype, "user", void 0);
    History = __decorate([
        (0, typeorm_1.Entity)("histories")
    ], History);
    return History;
}());
exports.History = History;
//# sourceMappingURL=history.js.map