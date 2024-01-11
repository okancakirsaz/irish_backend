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
const buffer_1 = require("buffer");
const storage_1 = require("@firebase/storage");
const firebase_init_1 = require("../core/firebase_init");
const firebase_column_enums_1 = require("../core/enums/firebase_column_enums");
const firestore_1 = require("firebase/firestore");
const user_data_dto_1 = require("../auth/dto/user_data.dto");
let CommunityService = class CommunityService {
    constructor() {
        this.network = firebase_init_1.FirebaseInit.instance;
    }
    async sharePost(params) {
        params.apiImage = await this.savePostImageToStorage(params.imageAsByte, params.id);
        params.imageAsByte = null;
        await this.network.setData(params, firebase_column_enums_1.FirebaseColumns.POSTS, params.id);
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
    async savePostImageToStorage(imageAsBase64, refId) {
        const decodedData = buffer_1.Buffer.from(imageAsBase64, 'base64').toString('binary');
        const imageDataAsUint8List = buffer_1.Buffer.from(decodedData, 'binary');
        const storageRef = (0, storage_1.ref)(this.network.storage, "posts/" + `${refId}.jpg`);
        await (0, storage_1.uploadBytesResumable)(storageRef, imageDataAsUint8List);
        return await (0, storage_1.getDownloadURL)(storageRef);
    }
};
exports.CommunityService = CommunityService;
exports.CommunityService = CommunityService = __decorate([
    (0, common_1.Injectable)()
], CommunityService);
//# sourceMappingURL=community.service.js.map