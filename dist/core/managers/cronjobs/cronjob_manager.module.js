"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronjobManagerModule = void 0;
const common_1 = require("@nestjs/common");
const cronjob_manager_1 = require("./cronjob_manager");
const web_socket_gateway_1 = require("../../web_socket_gateway");
let CronjobManagerModule = class CronjobManagerModule {
};
exports.CronjobManagerModule = CronjobManagerModule;
exports.CronjobManagerModule = CronjobManagerModule = __decorate([
    (0, common_1.Module)({
        providers: [cronjob_manager_1.CronjobManager, web_socket_gateway_1.SocketGateway]
    })
], CronjobManagerModule);
//# sourceMappingURL=cronjob_manager.module.js.map