"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseInit = void 0;
const app_1 = require("firebase/app");
const auth_1 = require("@firebase/auth");
const storage_1 = require("@firebase/storage");
class FirebaseInit {
    constructor() {
        this.firebaseConfig = {
            apiKey: "AIzaSyAH74ivDHm8-5wjXi7BRowY3BBj4vx8Ihk",
            authDomain: "irish-coffee-ceecd.firebaseapp.com",
            projectId: "irish-coffee-ceecd",
            storageBucket: "irish-coffee-ceecd.appspot.com",
            messagingSenderId: "615119038464",
            appId: "1:615119038464:web:b5495d6fd92889306e10e5",
            measurementId: "G-XK07CX0S6M"
        };
        this.app = (0, app_1.initializeApp)(this.firebaseConfig);
        this.auth = (0, auth_1.getAuth)(this.app);
        this.storage = (0, storage_1.getStorage)(this.app);
    }
}
exports.FirebaseInit = FirebaseInit;
FirebaseInit.instance = new FirebaseInit();
//# sourceMappingURL=firebase_init.js.map