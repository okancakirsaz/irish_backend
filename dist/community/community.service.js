"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunityService = void 0;
const common_1 = require("@nestjs/common");
const post_dto_1 = require("./dto/post.dto");
const firebase_services_1 = require("../core/firebase_services");
const firebase_column_enums_1 = require("../core/enums/firebase_column_enums");
const firestore_1 = require("firebase/firestore");
const user_data_dto_1 = require("../features/auth/dto/user_data.dto");
let CommunityService = class CommunityService {
    constructor() {
        this.network = firebase_services_1.FirebaseServices.instance;
    }
    async sharePost(params) {
        params.apiImage = await this.network.setImageToStorage(params.imageAsByte, params.id, "posts");
        params.imageAsByte = null;
        await this.network.setData(params, firebase_column_enums_1.FirebaseColumns.POSTS, params.id);
        await this.savePostToUserData(params);
        return params;
    }
    async savePostToUserData(params) {
        const usersCol = await (0, firestore_1.collection)(this.network.firestore, firebase_column_enums_1.FirebaseColumns.USERS);
        const findSharedUser = (0, firestore_1.query)(usersCol, (0, firestore_1.where)('uid', '==', params.user.uid));
        const foundUser = await (0, firestore_1.getDocs)(findSharedUser);
        foundUser.forEach((user) => {
            const userData = new user_data_dto_1.UserDataDto();
            userData.fromJson(user.data());
            userData.posts.push(params);
            (0, firestore_1.updateDoc)((0, firestore_1.doc)(usersCol, user.id), userData.toJson());
        });
    }
    async getCurrentPosts() {
        const q = (0, firestore_1.query)((0, firestore_1.collection)(this.network.firestore, firebase_column_enums_1.FirebaseColumns.POSTS), (0, firestore_1.orderBy)("timestamp", "desc"), (0, firestore_1.limit)(2));
        let response = [];
        const querySnapshot = await (0, firestore_1.getDocs)(q);
        querySnapshot.forEach((doc) => {
            const docAsElement = new post_dto_1.PostDto();
            docAsElement.fromJson(doc.data());
            response.push(docAsElement);
        });
        return response;
    }
    async getMoreCommunityShares(params) {
        const timestampQuery = (0, firestore_1.query)((0, firestore_1.collection)(this.network.firestore, firebase_column_enums_1.FirebaseColumns.POSTS), (0, firestore_1.orderBy)("timestamp", "desc"));
        const q = (0, firestore_1.query)(timestampQuery, (0, firestore_1.where)('timestamp', '<', params.time), (0, firestore_1.limit)(2));
        let response = [];
        const querySnapshot = await (0, firestore_1.getDocs)(q);
        querySnapshot.forEach((doc) => {
            const docAsElement = new post_dto_1.PostDto();
            docAsElement.fromJson(doc.data());
            response.push(docAsElement);
        });
        return response;
    }
};
exports.CommunityService = CommunityService;
exports.CommunityService = CommunityService = __decorate([
    (0, common_1.Injectable)()
], CommunityService);
//# sourceMappingURL=community.service.js.map