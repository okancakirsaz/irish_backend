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
                console.log(`For içi: ${isValid}`);
            }
        }
        console.log(isValid);
        return isValid;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)()
], OrderService);
//# sourceMappingURL=order.service.js.map