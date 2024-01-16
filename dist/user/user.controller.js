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
const user_settings_dto_1 = require("./dto/user_settings.dto");
const change_profile_photo_dto_1 = require("./dto/change_profile_photo.dto");
const uid_req_dto_1 = require("./dto/uid_req.dto");
const post_delete_req_dto_1 = require("./dto/post_delete_req.dto");
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
    async getUserSettings(header) {
        try {
            return await this.service.getUserSettings(header['token']);
        }
        catch (error) {
            throw Error(error);
        }
    }
    async setNewUserSettings(params, headers) {
        try {
            return this.service.setNewUserSettings(params, headers['token']);
        }
        catch (error) {
            throw Error(error);
        }
    }
    async changeProfilePhoto(params) {
        try {
            return await this.service.changeProfilePhoto(params);
        }
        catch (error) {
            throw Error(error);
        }
    }
    async deleteProfilePhoto(params) {
        try {
            return await this.service.deleteProfileImage(params);
        }
        catch (error) {
            throw Error(error);
        }
    }
    async deleteAccount(params) {
        try {
            return await this.service.deleteAccount(params);
        }
        catch (error) {
            throw Error(error);
        }
    }
    async deletePost(params) {
        try {
            return await this.service.deletePost(params);
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
__decorate([
    (0, common_1.Get)('user-settings'),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserSettings", null);
__decorate([
    (0, common_1.Post)('set-new-user-settings'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_settings_dto_1.UserSettingsDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setNewUserSettings", null);
__decorate([
    (0, common_1.Post)('change-profile-photo'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_profile_photo_dto_1.ChangeProfilePhotoDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeProfilePhoto", null);
__decorate([
    (0, common_1.Post)('delete-profile-image'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [uid_req_dto_1.UidReqDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteProfilePhoto", null);
__decorate([
    (0, common_1.Post)('delete-account'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [uid_req_dto_1.UidReqDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteAccount", null);
__decorate([
    (0, common_1.Post)('delete-post'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_delete_req_dto_1.PostDeleteReqDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deletePost", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)("user"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map