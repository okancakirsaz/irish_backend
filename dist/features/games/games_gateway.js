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
exports.GamesGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const duel_invite_dto_1 = require("./dto/duel_invite.dto");
let GamesGateway = class GamesGateway {
    constructor() {
        this.server = new socket_io_1.Server();
    }
    handleDuelInvite(body) {
        this.server.emit(`Duel Invite:${body.challengedUserId}`, body);
    }
    handleDuelAccepted(body) {
        this.server.emit(`Duel Response:${body.challengerUserId}`, body);
    }
    handleGameStarted(body) {
        this.server.emit(body.gameId, body);
    }
};
exports.GamesGateway = GamesGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], GamesGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("duel_invite"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [duel_invite_dto_1.DuelInviteDto]),
    __metadata("design:returntype", void 0)
], GamesGateway.prototype, "handleDuelInvite", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("duel_response"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [duel_invite_dto_1.DuelInviteDto]),
    __metadata("design:returntype", void 0)
], GamesGateway.prototype, "handleDuelAccepted", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("game_started"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [duel_invite_dto_1.DuelInviteDto]),
    __metadata("design:returntype", void 0)
], GamesGateway.prototype, "handleGameStarted", null);
exports.GamesGateway = GamesGateway = __decorate([
    (0, websockets_1.WebSocketGateway)()
], GamesGateway);
//# sourceMappingURL=games_gateway.js.map