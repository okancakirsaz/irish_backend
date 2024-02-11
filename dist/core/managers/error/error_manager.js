"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorManager = void 0;
const firebase_column_enums_1 = require("../../enums/firebase_column_enums");
const firebase_services_1 = require("../../firebase_services");
const error_log_dto_1 = require("./dto/error_log.dto");
class ErrorManager {
    constructor() {
        this.network = new firebase_services_1.FirebaseServices();
    }
    async saveErrorLog(msg) {
        const localeDate = new Date().toLocaleDateString();
        const localeTime = new Date().toLocaleTimeString();
        const date = `${localeDate} - ${localeTime}`;
        const errorLog = new error_log_dto_1.ErrorLogDto();
        errorLog.reason = msg;
        errorLog.date = date;
        console.log(errorLog.toJson());
        await this.network.setData(errorLog.toJson(), firebase_column_enums_1.FirebaseColumns.ERRORS, date);
    }
}
exports.ErrorManager = ErrorManager;
ErrorManager.instance = new ErrorManager();
//# sourceMappingURL=error_manager.js.map