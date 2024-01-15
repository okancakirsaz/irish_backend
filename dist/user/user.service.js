"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const firestore_1 = require("firebase/firestore");
const firebase_column_enums_1 = require("../core/enums/firebase_column_enums");
const firebase_services_1 = require("../core/firebase_services");
let UserService = class UserService {
    constructor() {
        this.network = firebase_services_1.FirebaseServices.instance;
    }
    async getUserDatasFromToken(token, dataType) {
        const col = (0, firestore_1.collection)(this.network.firestore, firebase_column_enums_1.FirebaseColumns.USERS);
        const q = (0, firestore_1.query)(col, (0, firestore_1.where)('token', '==', token));
        const docs = await (0, firestore_1.getDocs)(q);
        let response = [];
        docs.forEach((doc) => {
            response = doc.data()[dataType.dataType];
        });
        return response;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map