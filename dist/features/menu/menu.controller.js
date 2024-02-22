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
exports.MenuController = void 0;
const common_1 = require("@nestjs/common");
const menu_service_1 = require("./menu.service");
const menu_item_dto_1 = require("./dto/menu_item.dto");
let MenuController = class MenuController {
    constructor(service) {
        this.service = service;
    }
    async getMenu() {
        try {
            return await this.service.getMenu();
        }
        catch (error) {
            throw Error(error);
        }
    }
    async getMenuItem(params) {
        try {
            return await this.service.getMenuItem(params["itemName"]);
        }
        catch (error) {
            throw Error(error);
        }
    }
    async createMenuElement(params) {
        try {
            return await this.service.createMenuElement(params);
        }
        catch (error) {
            throw Error(error);
        }
    }
    async deleteMenuElement(params) {
        try {
            return await this.service.deleteMenuElement(params);
        }
        catch (error) {
            throw Error(error);
        }
    }
    async updateMenuElement(params) {
        try {
            return await this.service.updateMenuElement(params);
        }
        catch (error) {
            throw Error(error);
        }
    }
};
exports.MenuController = MenuController;
__decorate([
    (0, common_1.Get)("get-menu"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "getMenu", null);
__decorate([
    (0, common_1.Post)("get-menu-item"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "getMenuItem", null);
__decorate([
    (0, common_1.Post)("create-element"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [menu_item_dto_1.MenuItemDto]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "createMenuElement", null);
__decorate([
    (0, common_1.Post)("delete-element"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [menu_item_dto_1.MenuItemDto]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "deleteMenuElement", null);
__decorate([
    (0, common_1.Post)("update-element"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [menu_item_dto_1.MenuItemDto]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "updateMenuElement", null);
exports.MenuController = MenuController = __decorate([
    (0, common_1.Controller)("menu"),
    __metadata("design:paramtypes", [menu_service_1.MenuService])
], MenuController);
//# sourceMappingURL=menu.controller.js.map