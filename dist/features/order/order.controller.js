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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const bucket_verification_request_dto_1 = require("./dto/bucket_verification_request.dto");
const payment_request_dto_1 = require("./dto/payment_request.dto");
const order_request_dto_1 = require("./dto/order_request.dto");
const order_response_dto_1 = require("./dto/order_response.dto");
const web_socket_gateway_1 = require("../../core/web_socket_gateway");
let OrderController = class OrderController {
    constructor(service, webSocket) {
        this.service = service;
        this.webSocket = webSocket;
    }
    async bucketVerification(params) {
        try {
            return await this.service.bucketVerification(params);
        }
        catch (error) {
            throw Error(error);
        }
    }
    async payment(params) {
        try {
            return await this.service.paymentGateway(params);
        }
        catch (error) {
            throw Error(error);
        }
    }
    async createOrder(params) {
        try {
            return await this.service.createOrder(params);
        }
        catch (error) {
            throw Error(error);
        }
    }
    async getOrders() {
        try {
            return await this.service.getOrders();
        }
        catch (error) {
            throw Error(error);
        }
    }
    async submitOrder(params) {
        try {
            return await this.service.submitOrder(params);
        }
        catch (error) {
            throw Error(error);
        }
    }
    async deleteOrder(params) {
        try {
            return await this.service.deleteOrder(params);
        }
        catch (error) {
            throw Error(error);
        }
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Post)('verification'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bucket_verification_request_dto_1.BucketVerificationRequestDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "bucketVerification", null);
__decorate([
    (0, common_1.Post)('payment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_request_dto_1.PaymentRequestDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "payment", null);
__decorate([
    (0, common_1.Post)('create-order'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_request_dto_1.OrderRequestDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Get)('orders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Post)('change-order-state'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_response_dto_1.OrderResponseDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "submitOrder", null);
__decorate([
    (0, common_1.Post)('delete-order'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_response_dto_1.OrderResponseDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "deleteOrder", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService, web_socket_gateway_1.SocketGateway])
], OrderController);
//# sourceMappingURL=order.controller.js.map