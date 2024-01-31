"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const bucket_verification_response_dto_1 = require("./dto/bucket_verification_response.dto");
const firebase_services_1 = require("../../core/firebase_services");
const firebase_column_enums_1 = require("../../core/enums/firebase_column_enums");
const payment_response_dto_1 = require("./dto/payment_response.dto");
const order_response_dto_1 = require("./dto/order_response.dto");
let OrderService = class OrderService {
    constructor() {
        this.network = firebase_services_1.FirebaseServices.instance;
    }
    async bucketVerification(params) {
        const response = new bucket_verification_response_dto_1.BucketVerificationResponseDto();
        const isBucketValid = await this.checkBucket(params.idList);
        if (isBucketValid) {
            response.isAllValid = true;
        }
        else {
            response.errorMessage = "Menüde artık bulunmayan bir şey sipariş ettiniz.";
            response.isAllValid = false;
        }
        return response;
    }
    async checkBucket(idList) {
        let isValid = true;
        for (let i = 0; i <= idList.length - 1; i++) {
            const doc = await this.network.getDoc(firebase_column_enums_1.FirebaseColumns.MENU, idList[i]);
            if (doc.data() == null) {
                isValid = false;
            }
        }
        return isValid;
    }
    async paymentGateway(params) {
        const response = new payment_response_dto_1.PaymentResponseDto();
        response.isSuccess = true;
        response.errorMessage = null;
        return response;
    }
    async createOrder(params) {
        const response = new order_response_dto_1.OrderResponseDto();
        response.orderList = params.orderList;
        response.totalPrice = params.totalPrice;
        response.timestamp = params.timestamp;
        response.isOrderReady = false;
        response.orderId = await this.createOrderNumber();
        await this.network.setData(response.toJson(), firebase_column_enums_1.FirebaseColumns.ORDERS, `${response.orderId}`);
        return response;
    }
    async createOrderNumber() {
        const lastOrderData = (await this.network.getDoc(firebase_column_enums_1.FirebaseColumns.SYSTEM_LOGS, "order-log")).data();
        const dateObject = new Date();
        let newOrderData = {
            day: lastOrderData['day'],
            month: lastOrderData['month'],
            year: lastOrderData['year'],
            lastOrderCount: lastOrderData['lastOrderCount']
        };
        if (newOrderData['day'] != dateObject.getDate() || newOrderData['month'] != dateObject.getMonth() + 1) {
            newOrderData['lastOrderCount'] = 1;
            newOrderData['day'] = dateObject.getDate();
            newOrderData['month'] = dateObject.getMonth() + 1;
            newOrderData['year'] = dateObject.getFullYear();
        }
        else {
            newOrderData['lastOrderCount'] += 1;
        }
        await this.network.updateDocument(firebase_column_enums_1.FirebaseColumns.SYSTEM_LOGS, "order-log", newOrderData);
        return newOrderData['lastOrderCount'];
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)()
], OrderService);
//# sourceMappingURL=order.service.js.map