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
const user_data_dto_1 = require("../auth/dto/user_data.dto");
const firebase_column_enums_1 = require("../core/enums/firebase_column_enums");
const firebase_services_1 = require("../core/firebase_services");
const user_settings_dto_1 = require("./dto/user_settings.dto");
const boolean_single_response_dto_1 = require("./dto/boolean_single_response.dto");
const auth_1 = require("@firebase/auth");
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
    async getUserSettings(token) {
        const userData = await this.getUserData(token);
        return this.fetchUserSettings(userData);
    }
    async getUserData(token) {
        const col = (0, firestore_1.collection)(this.network.firestore, firebase_column_enums_1.FirebaseColumns.USERS);
        const q = (0, firestore_1.query)(col, (0, firestore_1.where)('token', '==', token));
        const docs = await (0, firestore_1.getDocs)(q);
        const dto = new user_data_dto_1.UserDataDto();
        docs.forEach((doc) => {
            dto.fromJson(doc.data());
        });
        return dto;
    }
    fetchUserSettings(userData) {
        let settings = new user_settings_dto_1.UserSettingsDto();
        settings.email = userData.email;
        settings.isAnonym = userData.isAnonym;
        settings.name = userData.name;
        settings.phoneNumber = userData.phoneNumber;
        settings.photoUrl = userData.profileImage;
        return settings;
    }
    async setNewUserSettings(params, token) {
        let newSettings = new user_settings_dto_1.UserSettingsDto();
        let userData = await this.getUserData(token);
        const newUserData = await this.updateUserData(userData, params);
        newSettings.email = newUserData.email;
        newSettings.isAnonym = newUserData.isAnonym;
        newSettings.name = newUserData.name;
        newSettings.phoneNumber = newUserData.phoneNumber;
        newSettings.photoUrl = newUserData.profileImage;
        return newSettings;
    }
    async updateUserData(userData, params) {
        userData.isAnonym = params.isAnonym;
        userData.name = params.name;
        userData.email = params.email;
        userData.phoneNumber = params.phoneNumber;
        const document = (0, firestore_1.doc)((0, firestore_1.collection)(this.network.firestore, firebase_column_enums_1.FirebaseColumns.USERS), userData.uid);
        await (0, firestore_1.updateDoc)(document, userData.toJson());
        return userData;
    }
    async changeProfilePhoto(params) {
        const imageRef = await this.network.setImageToStorage(params.imageAsByte, params.uid, "profilePhotos");
        params.profileImage = imageRef;
        await this.setProfileImageToDb(params.uid, params.profileImage);
        return params;
    }
    async setProfileImageToDb(uid, profileImage) {
        const document = (0, firestore_1.doc)((0, firestore_1.collection)(this.network.firestore, firebase_column_enums_1.FirebaseColumns.USERS), uid);
        await (0, firestore_1.updateDoc)(document, { 'profileImage': profileImage });
    }
    async deleteProfileImage(params) {
        let response = new boolean_single_response_dto_1.BooleanSingleResponseDto();
        try {
            await this.setProfileImageToDb(params.uid, null);
            response.isSuccess = true;
            return response;
        }
        catch (_) {
            response.isSuccess = false;
            return response;
        }
    }
    async deleteAccount(params) {
        let response = new boolean_single_response_dto_1.BooleanSingleResponseDto();
        try {
            await this.deleteUserFromAuthService(params.uid);
            await this.deleteUserPosts(params.uid);
            await this.network.deleteDoc(firebase_column_enums_1.FirebaseColumns.USERS, params.uid);
            await this.deleteUserProfileImageFromStorage(params.uid);
            response.isSuccess = true;
            return response;
        }
        catch (_) {
            console.log(_);
            response.isSuccess = false;
            return response;
        }
    }
    async deleteUserProfileImageFromStorage(uid) {
        try {
            await this.network.deleteImageFromStorage(uid, "profilePhotos");
        }
        catch (error) {
        }
    }
    async deleteUserPosts(uid) {
        const currentUser = await this.getUserForDelete(uid);
        const postsCol = await (0, firestore_1.collection)(this.network.firestore, firebase_column_enums_1.FirebaseColumns.POSTS);
        currentUser.posts.forEach(async (data) => {
            const findPosts = (0, firestore_1.query)(postsCol, (0, firestore_1.where)('id', '==', data.id));
            const foundPosts = await (0, firestore_1.getDocs)(findPosts);
            foundPosts.forEach(async (post) => {
                await (0, firestore_1.deleteDoc)((0, firestore_1.doc)(postsCol, post.data()['id']));
                await this.network.deleteImageFromStorage(post.data()['id'], "posts");
            });
        });
    }
    async getUserForDelete(uid) {
        const user = await this.network.getDoc(firebase_column_enums_1.FirebaseColumns.USERS, uid);
        const userAsDto = new user_data_dto_1.UserDataDto();
        userAsDto.fromJson(user.data());
        return userAsDto;
    }
    async deleteUserFromAuthService(uid) {
        const userData = await this.network.getDoc(firebase_column_enums_1.FirebaseColumns.USERS, uid);
        const user = await (0, auth_1.signInWithEmailAndPassword)(this.network.auth, userData.data()['email'], userData.data()['password']);
        await (0, auth_1.deleteUser)(user.user);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map