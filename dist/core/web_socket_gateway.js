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
exports.SocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const currently_in_irish_dto_1 = require("../features/community/dto/currently_in_irish.dto");
const order_response_dto_1 = require("../features/order/dto/order_response.dto");
let SocketGateway = class SocketGateway {
    constructor() {
        this.server = new socket_io_1.Server();
    }
    handleOrderReceivedCase(body) {
        this.server.emit("new_order", body);
    }
    handleNewCustomer(body) {
        this.server.emit("new_customer", body);
    }
    handleDeleteCustomer(body) {
        this.server.emit("delete_customer", body);
    }
    handleBannedUser(body) {
        this.server.emit("user_banned", body);
    }
};
exports.SocketGateway = SocketGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SocketGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("new_order"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_response_dto_1.OrderResponseDto]),
    __metadata("design:returntype", void 0)
], SocketGateway.prototype, "handleOrderReceivedCase", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("new_customer"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [currently_in_irish_dto_1.CurrentlyInIrishDto]),
    __metadata("design:returntype", void 0)
], SocketGateway.prototype, "handleNewCustomer", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("delete_customer"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [currently_in_irish_dto_1.CurrentlyInIrishDto]),
    __metadata("design:returntype", void 0)
], SocketGateway.prototype, "handleDeleteCustomer", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("user_banned"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SocketGateway.prototype, "handleBannedUser", null);
exports.SocketGateway = SocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)()
], SocketGateway);
//# sourceMappingURL=web_socket_gateway.js.map