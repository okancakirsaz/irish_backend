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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_data_types_1 = require("./core/user_data_types");
let UserController = class UserController {
    constructor(service) {
        this.service = service;
    }
    async getUserPosts(header) {
        try {
            return await this.service.getUserDatasFromToken(header['token'], new user_data_types_1.UserPosts());
        }
        catch (error) {
            throw Error(error);
        }
    }
    async getUserScores(header) {
        try {
            return await this.service.getUserDatasFromToken(header['token'], new user_data_types_1.UserScores());
        }
        catch (error) {
            throw Error(error);
        }
    }
    async getUserFavoriteFoods(header) {
        try {
            return await this.service.getUserDatasFromToken(header['token'], new user_data_types_1.UserFavoriteFoods());
        }
        catch (error) {
            throw Error(error);
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)("user-posts"),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserPosts", null);
__decorate([
    (0, common_1.Get)('user-scores'),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserScores", null);
__decorate([
    (0, common_1.Get)('user-foods'),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserFavoriteFoods", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)("user"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map