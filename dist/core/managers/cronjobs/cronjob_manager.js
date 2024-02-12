"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronjobManager = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const firebase_services_1 = require("../../firebase_services");
const firebase_column_enums_1 = require("../../enums/firebase_column_enums");
const web_socket_gateway_1 = require("../../web_socket_gateway");
const currently_in_irish_dto_1 = require("../../../features/community/dto/currently_in_irish.dto");
let CronjobManager = class CronjobManager {
    constructor(socket) {
        this.socket = socket;
        this.network = firebase_services_1.FirebaseServices.instance;
    }
    async syncActiveCustomers() {
        const currentTime = new Date().toISOString();
        await this.checkAndDeleteCustomersInDb(currentTime);
    }
    async checkAndDeleteCustomersInDb(currentTime) {
        const currentDate = new Date(currentTime);
        const customers = await this.network.getDocs(firebase_column_enums_1.FirebaseColumns.CUSTOMERS);
        for (const index in customers) {
            const targetTime = new Date(customers[index]['timestamp']);
            const asMilliSecond = currentDate.getTime() - targetTime.getTime();
            const hoursDifference = asMilliSecond / (1000 * 60 * 60);
            if (hoursDifference >= 2) {
                await this.network.deleteDoc(firebase_column_enums_1.FirebaseColumns.CUSTOMERS, customers[index]["uid"]);
                this.socket.handleDeleteCustomer(new currently_in_irish_dto_1.CurrentlyInIrishDto().fromJsonWithReturn(customers[index]));
            }
        }
    }
};
exports.CronjobManager = CronjobManager;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_5_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronjobManager.prototype, "syncActiveCustomers", null);
exports.CronjobManager = CronjobManager = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [web_socket_gateway_1.SocketGateway])
], CronjobManager);
//# sourceMappingURL=cronjob_manager.js.map