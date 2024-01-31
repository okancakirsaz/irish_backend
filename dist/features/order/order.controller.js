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
let OrderController = class OrderController {
    constructor(service) {
        this.service = service;
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
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map