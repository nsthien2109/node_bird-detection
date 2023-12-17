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
exports.Bird = void 0;
var typeorm_1 = require("typeorm");
var prediction_1 = require("./prediction");
var Bird = /** @class */ (function () {
    function Bird() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Bird.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Bird.prototype, "common_name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Bird.prototype, "vietnamese_name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Bird.prototype, "scientific_name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Bird.prototype, "bird_order", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Bird.prototype, "family", void 0);
    __decorate([
        (0, typeorm_1.Column)('text'),
        __metadata("design:type", String)
    ], Bird.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)('text'),
        __metadata("design:type", String)
    ], Bird.prototype, "distribution", void 0);
    __decorate([
        (0, typeorm_1.Column)('text'),
        __metadata("design:type", String)
    ], Bird.prototype, "diet", void 0);
    __decorate([
        (0, typeorm_1.Column)('text'),
        __metadata("design:type", String)
    ], Bird.prototype, "conservation_status", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Bird.prototype, "class_name", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return prediction_1.Prediction; }, function (prediction) { return prediction.bird; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", Array)
    ], Bird.prototype, "predictions", void 0);
    Bird = __decorate([
        (0, typeorm_1.Entity)('birds')
    ], Bird);
    return Bird;
}());
exports.Bird = Bird;
//# sourceMappingURL=bird.js.map