"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./features/auth/auth.module");
const community_module_1 = require("./features/community/community.module");
const menu_module_1 = require("./features/menu/menu.module");
const user_module_1 = require("./features/user/user.module");
const games_module_1 = require("./features/games/games.module");
const order_module_1 = require("./features/order/order.module");
const schedule_1 = require("@nestjs/schedule");
const cronjob_manager_module_1 = require("./core/managers/cronjobs/cronjob_manager.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule, community_module_1.CommunityModule, menu_module_1.MenuModule, user_module_1.UserModule, games_module_1.GamesModule, order_module_1.OrderModule, schedule_1.ScheduleModule.forRoot(), cronjob_manager_module_1.CronjobManagerModule
        ],
        providers: [],
        controllers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map