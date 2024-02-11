"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorManager = void 0;
const firebase_services_1 = require("../firebase_services");
class ErrorManager {
    constructor() {
        this.network = new firebase_services_1.FirebaseServices();
    }
    async saveErrorLog(msg) {
        const date = new Date().toLocaleDateString();
        this.network.
        ;
    }
}
exports.ErrorManager = ErrorManager;
ErrorManager.instance = new ErrorManager();
//# sourceMappingURL=error_manager.js.map