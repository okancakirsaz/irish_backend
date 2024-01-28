"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_data_dto_1 = require("./dto/user_data.dto");
const firebase_services_1 = require("../core/firebase_services");
const firebase_column_enums_1 = require("../core/enums/firebase_column_enums");
const auth_1 = require("@firebase/auth");
const forgot_password_response_dto_1 = require("./dto/forgot_password_response.dto");
let AuthService = class AuthService {
    async signUp(userData) {
        const createdUser = await this.createUser(userData.email, userData.password);
        const newUser = await this.saveUserToDb(userData, createdUser);
        await (0, auth_1.signOut)(firebase_services_1.FirebaseServices.instance.auth);
        return newUser;
    }
    async createUser(email, password) {
        try {
            await (0, auth_1.createUserWithEmailAndPassword)(firebase_services_1.FirebaseServices.instance.auth, email, password);
            return firebase_services_1.FirebaseServices.instance.auth.currentUser;
        }
        catch (error) {
            console.log(error);
        }
    }
    async saveUserToDb(userData, createdUser) {
        userData.password = null;
        userData.uid = createdUser.uid;
        userData.token = await createdUser.getIdToken();
        await firebase_services_1.FirebaseServices.instance.setData(userData, firebase_column_enums_1.FirebaseColumns.USERS, firebase_services_1.FirebaseServices.instance.auth.currentUser.uid);
        return userData;
    }
    async logIn(params) {
        try {
            let user = new user_data_dto_1.UserDataDto();
            await (0, auth_1.signInWithEmailAndPassword)(firebase_services_1.FirebaseServices.instance.auth, params.email, params.password);
            const userData = (await firebase_services_1.FirebaseServices.instance.getDoc(firebase_column_enums_1.FirebaseColumns.USERS, firebase_services_1.FirebaseServices.instance.auth.currentUser.uid)).data();
            user.fromJson(userData);
            await (0, auth_1.signOut)(firebase_services_1.FirebaseServices.instance.auth);
            console.log(user);
            return user;
        }
        catch (_) {
            return null;
        }
    }
    async forgotPassword(params) {
        const response = new forgot_password_response_dto_1.ForgotPasswordResponseDto();
        response.email = params.email;
        try {
            await (0, auth_1.sendPasswordResetEmail)(firebase_services_1.FirebaseServices.instance.auth, params.email);
            response.isMailSended = true;
            response.reason = null;
        }
        catch (_) {
            response.isMailSended = false;
            response.reason = "Geçersiz e-posta adresi";
        }
        return response;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map