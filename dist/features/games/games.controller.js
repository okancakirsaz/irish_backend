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
exports.GamesController = void 0;
const common_1 = require("@nestjs/common");
const games_service_1 = require("./games.service");
const event_dto_1 = require("./dto/event.dto");
let GamesController = class GamesController {
    constructor(service) {
        this.service = service;
    }
    async getEvents() {
        try {
            return await this.service.getActiveEvents();
        }
        catch (error) {
            throw Error(error);
        }
    }
    async createEvent(params) {
        try {
            return await this.service.createEvent(params);
        }
        catch (error) {
            throw Error(error);
        }
    }
    async deleteEvent(params) {
        try {
            return await this.service.deleteEvent(params);
        }
        catch (error) {
            throw Error(error);
        }
    }
};
exports.GamesController = GamesController;
__decorate([
    (0, common_1.Get)('get-active-events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "getEvents", null);
__decorate([
    (0, common_1.Post)('create-event'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_dto_1.EventDto]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "createEvent", null);
__decorate([
    (0, common_1.Post)('delete-event'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_dto_1.EventDto]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "deleteEvent", null);
exports.GamesController = GamesController = __decorate([
    (0, common_1.Controller)("games"),
    __metadata("design:paramtypes", [games_service_1.GamesService])
], GamesController);
//# sourceMappingURL=games.controller.js.map