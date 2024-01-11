"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const menu_item_dto_1 = require("./dto/menu_item.dto");
const firebase_init_1 = require("../core/firebase_init");
const firebase_column_enums_1 = require("../core/enums/firebase_column_enums");
let MenuService = class MenuService {
    constructor() {
        this.network = firebase_init_1.FirebaseInit.instance;
    }
    async getMenu() {
        const response = await this.network.getDocs(firebase_column_enums_1.FirebaseColumns.MENU);
        let responseAsModel = [];
        response.forEach((element) => {
            let elementAsModel = new menu_item_dto_1.MenuItemDto();
            elementAsModel.fromJson(element);
            responseAsModel.push(element);
        });
        return responseAsModel;
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)()
], MenuService);
//# sourceMappingURL=menu.service.js.map