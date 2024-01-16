"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseServices = void 0;
const app_1 = require("firebase/app");
const auth_1 = require("@firebase/auth");
const firestore_1 = require("firebase/firestore");
const storage_1 = require("@firebase/storage");
class FirebaseServices {
    constructor() {
        this.firebaseConfig = {
            apiKey: "AIzaSyAH74ivDHm8-5wjXi7BRowY3BBj4vx8Ihk",
            authDomain: "irish-coffee-ceecd.firebaseapp.com",
            projectId: "irish-coffee-ceecd",
            storageBucket: "irish-coffee-ceecd.appspot.com",
            messagingSenderId: "615119038464",
            appId: "1:615119038464:web:b5495d6fd92889306e10e5",
            measurementId: "G-XK07CX0S6M",
        };
        this.app = (0, app_1.initializeApp)(this.firebaseConfig);
        this.auth = (0, auth_1.getAuth)(this.app);
        this.firestore = (0, firestore_1.getFirestore)(this.app);
        this.storage = (0, storage_1.getStorage)(this.app);
    }
    async setData(data, colName, docName) {
        try {
            const col = (0, firestore_1.collection)(this.firestore, colName);
            await (0, firestore_1.setDoc)((0, firestore_1.doc)(col, docName), data);
        }
        catch (error) {
            console.log(`You have an error in write ${colName}/${docName} data\nThis is your error: `, error);
        }
    }
    async getDoc(colName, docName) {
        try {
            const col = (0, firestore_1.collection)(this.firestore, colName);
            const response = await (0, firestore_1.getDoc)((0, firestore_1.doc)(col, docName));
            return response;
        }
        catch (error) {
            console.log(`You have an error in get ${colName}/${docName} data\nThis is your error: `, error);
        }
    }
    async deleteDoc(colName, docName) {
        try {
            const col = (0, firestore_1.collection)(this.firestore, colName);
            await (0, firestore_1.deleteDoc)((0, firestore_1.doc)(col, docName));
        }
        catch (error) {
            console.log(`You have an error in delete ${colName}/${docName} data\nThis is your error: `, error);
        }
    }
    async getDocs(colName) {
        try {
            let response = [];
            const col = await (0, firestore_1.collection)(this.firestore, colName);
            const request = await (0, firestore_1.getDocs)(col);
            request.forEach((data) => { response.push(data.data()); });
            return response;
        }
        catch (error) {
            console.log(`You have an error in get ${colName} data\nThis is your error: `, error);
        }
    }
    async updateDocument(colName, docName, data) {
        const col = (0, firestore_1.collection)(this.firestore, colName);
        const docRef = (0, firestore_1.doc)(col, docName);
        await (0, firestore_1.updateDoc)(docRef, data);
    }
    async setImageToStorage(imageAsBase64, refId, folderName) {
        const decodedData = Buffer.from(imageAsBase64, 'base64').toString('binary');
        const imageDataAsUint8List = Buffer.from(decodedData, 'binary');
        const storageRef = (0, storage_1.ref)(this.storage, `${folderName}/` + `${refId}.jpg`);
        await (0, storage_1.uploadBytesResumable)(storageRef, imageDataAsUint8List);
        return await (0, storage_1.getDownloadURL)(storageRef);
    }
    async deleteImageFromStorage(refId, folderName) {
        const storageRef = (0, storage_1.ref)(this.storage, `${folderName}/` + `${refId}.jpg`);
        await (0, storage_1.deleteObject)(storageRef);
    }
}
exports.FirebaseServices = FirebaseServices;
FirebaseServices.instance = new FirebaseServices();
//# sourceMappingURL=firebase_services.js.map