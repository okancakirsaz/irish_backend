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
exports.CommunityController = void 0;
const common_1 = require("@nestjs/common");
const community_service_1 = require("./community.service");
const post_dto_1 = require("./dto/post.dto");
const get_more_posts_req_dto_1 = require("./dto/get_more_posts_req.dto");
const user_data_dto_1 = require("../auth/dto/user_data.dto");
let CommunityController = class CommunityController {
    constructor(service) {
        this.service = service;
    }
    async sharePost(params) {
        try {
            return await this.service.sharePost(params);
        }
        catch (error) {
            throw Error(error);
        }
    }
    async getCommunityShares() {
        return await this.service.getCurrentPosts();
    }
    async getMoreCommunityShares(params) {
        return await this.service.getMoreCommunityShares(params);
    }
    async getCustomers() {
        try {
            return await this.service.getCustomerList();
        }
        catch (error) {
            throw Error(error);
        }
    }
    async getUsers() {
        try {
            return await this.service.getAllUsers();
        }
        catch (error) {
            throw Error(error);
        }
    }
    async blockUser(params) {
        try {
            return await this.service.blockUser(params);
        }
        catch (error) {
            throw Error(error);
        }
    }
    async unblockUser(params) {
        try {
            return await this.service.unblockUser(params);
        }
        catch (error) {
            throw Error(error);
        }
    }
};
exports.CommunityController = CommunityController;
__decorate([
    (0, common_1.Post)('share-post'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_dto_1.PostDto]),
    __metadata("design:returntype", Promise)
], CommunityController.prototype, "sharePost", null);
__decorate([
    (0, common_1.Get)("community-shares"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommunityController.prototype, "getCommunityShares", null);
__decorate([
    (0, common_1.Post)("get-more-community-shares"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_more_posts_req_dto_1.GetMorePostDto]),
    __metadata("design:returntype", Promise)
], CommunityController.prototype, "getMoreCommunityShares", null);
__decorate([
    (0, common_1.Get)("currently-in-irish-coffee"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommunityController.prototype, "getCustomers", null);
__decorate([
    (0, common_1.Get)('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommunityController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Post)('block-user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_data_dto_1.UserDataDto]),
    __metadata("design:returntype", Promise)
], CommunityController.prototype, "blockUser", null);
__decorate([
    (0, common_1.Post)('unblock-user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_data_dto_1.UserDataDto]),
    __metadata("design:returntype", Promise)
], CommunityController.prototype, "unblockUser", null);
exports.CommunityController = CommunityController = __decorate([
    (0, common_1.Controller)('community'),
    __metadata("design:paramtypes", [community_service_1.CommunityService])
], CommunityController);
//# sourceMappingURL=community.controller.js.map