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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const bucket_verification_response_dto_1 = require("./dto/bucket_verification_response.dto");
const firebase_services_1 = require("../../core/firebase_services");
const firebase_column_enums_1 = require("../../core/enums/firebase_column_enums");
const payment_response_dto_1 = require("./dto/payment_response.dto");
const order_response_dto_1 = require("./dto/order_response.dto");
const user_data_dto_1 = require("../auth/dto/user_data.dto");
const menu_item_dto_1 = require("../menu/dto/menu_item.dto");
const favorite_food_dto_1 = require("../user/dto/favorite_food.dto");
const web_socket_gateway_1 = require("../../core/web_socket_gateway");
const currently_in_irish_dto_1 = require("../community/dto/currently_in_irish.dto");
let OrderService = class OrderService {
    constructor(socket) {
        this.socket = socket;
        this.network = firebase_services_1.FirebaseServices.instance;
    }
    async bucketVerification(params) {
        const response = new bucket_verification_response_dto_1.BucketVerificationResponseDto();
        const isBucketValid = await this.checkBucket(params.idList);
        if (isBucketValid) {
            response.isAllValid = true;
        }
        else {
            response.errorMessage =
                "Menüde artık bulunmayan bir şey sipariş ettiniz.";
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
        response.userId = params.userId;
        response.orderId = await this.createOrderNumber();
        await this.network.setData(response.toJson(), firebase_column_enums_1.FirebaseColumns.ORDERS, `${response.orderId}`);
        if (params.userId != "admin-panel") {
            await this.updateUserFavoriteFoods(params);
            await this.updateActiveCustomersList(params.userId);
        }
        this.socket.handleOrderReceivedCase(response);
        return response;
    }
    async createOrderNumber() {
        const lastOrderData = (await this.network.getDoc(firebase_column_enums_1.FirebaseColumns.SYSTEM_LOGS, "order-log")).data();
        const dateObject = new Date();
        let newOrderData = {
            day: lastOrderData["day"],
            month: lastOrderData["month"],
            year: lastOrderData["year"],
            lastOrderCount: lastOrderData["lastOrderCount"],
        };
        if (newOrderData["day"] != dateObject.getDate() ||
            newOrderData["month"] != dateObject.getMonth() + 1) {
            newOrderData["lastOrderCount"] = 1;
            newOrderData["day"] = dateObject.getDate();
            newOrderData["month"] = dateObject.getMonth() + 1;
            newOrderData["year"] = dateObject.getFullYear();
        }
        else {
            newOrderData["lastOrderCount"] += 1;
        }
        await this.network.updateDocument(firebase_column_enums_1.FirebaseColumns.SYSTEM_LOGS, "order-log", newOrderData);
        return newOrderData["lastOrderCount"];
    }
    async updateUserFavoriteFoods(params) {
        const user = await this.getUser(params.userId);
        const foodList = [];
        for (let i = 0; i <= params.orderList.length - 1; i++) {
            const favoriteFoodData = new favorite_food_dto_1.FavoriteFoodDto();
            const menuItem = await this.getMenuItem(params.orderList[i]["name"]);
            (favoriteFoodData.photo = menuItem.image),
                (favoriteFoodData.count = this.getFavoriteFoodCount(menuItem.name, user));
            favoriteFoodData.foodName = menuItem.name;
            foodList.push(favoriteFoodData.toJson());
        }
        await this.network.updateDocument(firebase_column_enums_1.FirebaseColumns.USERS, params.userId, {
            favoriteFoods: foodList,
        });
    }
    async getUser(userId) {
        const userData = (await this.network.getDoc(firebase_column_enums_1.FirebaseColumns.USERS, userId)).data();
        const userDataAsModel = new user_data_dto_1.UserDataDto();
        userDataAsModel.fromJson(userData);
        return userDataAsModel;
    }
    async getMenuItem(itemName) {
        const menuData = (await this.network.getDoc(firebase_column_enums_1.FirebaseColumns.MENU, itemName)).data();
        const menuDataAsModel = new menu_item_dto_1.MenuItemDto();
        menuDataAsModel.fromJson(menuData);
        return menuDataAsModel;
    }
    getFavoriteFoodCount(foodName, userData) {
        let count = 1;
        for (let i = 0; i <= userData.favoriteFoods.length - 1; i++) {
            if (foodName == userData.favoriteFoods[i].foodName) {
                count = userData.favoriteFoods[i].count + 1;
            }
        }
        return count;
    }
    async getOrders() {
        return await this.network.getDocs(firebase_column_enums_1.FirebaseColumns.ORDERS);
    }
    async deleteOrder(params) {
        await this.network.deleteDoc(firebase_column_enums_1.FirebaseColumns.ORDERS, `${params.orderId}`);
        return params;
    }
    async submitOrder(params) {
        params.isOrderReady = true;
        await this.network.setData(params, firebase_column_enums_1.FirebaseColumns.ORDERS, `${params.orderId}`);
        return params;
    }
    async updateActiveCustomersList(userId) {
        const user = await this.getUser(userId);
        const userToCustomer = new currently_in_irish_dto_1.CurrentlyInIrishDto();
        userToCustomer.name = user.name;
        userToCustomer.gender = user.gender;
        userToCustomer.isAnonym = user.isAnonym;
        userToCustomer.token = user.token;
        userToCustomer.uid = user.uid;
        userToCustomer.timestamp = new Date().toISOString();
        userToCustomer.profileImage = user.profileImage;
        this.socket.handleNewCustomer(userToCustomer);
        await this.network.setData(userToCustomer.toJson(), firebase_column_enums_1.FirebaseColumns.CUSTOMERS, userToCustomer.uid);
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [web_socket_gateway_1.SocketGateway])
], OrderService);
//# sourceMappingURL=order.service.js.map