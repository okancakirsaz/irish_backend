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
const firebase_init_1 = require("../core/firebase_init");
const firebase_column_enums_1 = require("../core/enums/firebase_column_enums");
const auth_1 = require("@firebase/auth");
const forgot_password_response_dto_1 = require("./dto/forgot_password_response.dto");
let AuthService = class AuthService {
    async signUp(userData) {
        await (0, auth_1.createUserWithEmailAndPassword)(firebase_init_1.FirebaseInit.instance.auth, userData.email, userData.password);
        userData.uid = firebase_init_1.FirebaseInit.instance.auth.currentUser.uid;
        userData.token = await firebase_init_1.FirebaseInit.instance.auth.currentUser.getIdToken();
        userData.password = null;
        await firebase_init_1.FirebaseInit.instance.setData(userData, firebase_column_enums_1.FirebaseColumns.USERS, firebase_init_1.FirebaseInit.instance.auth.currentUser.uid);
        await (0, auth_1.signOut)(firebase_init_1.FirebaseInit.instance.auth);
        return userData;
    }
    async logIn(params) {
        try {
            let user = new user_data_dto_1.UserDataDto();
            await (0, auth_1.signInWithEmailAndPassword)(firebase_init_1.FirebaseInit.instance.auth, params.email, params.password);
            const userData = (await firebase_init_1.FirebaseInit.instance.getDoc(firebase_column_enums_1.FirebaseColumns.USERS, firebase_init_1.FirebaseInit.instance.auth.currentUser.uid)).data();
            user.fromJson(userData);
            await (0, auth_1.signOut)(firebase_init_1.FirebaseInit.instance.auth);
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
            await (0, auth_1.sendPasswordResetEmail)(firebase_init_1.FirebaseInit.instance.auth, params.email);
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