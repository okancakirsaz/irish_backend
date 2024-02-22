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
const firebase_services_1 = require("../../core/firebase_services");
const firebase_column_enums_1 = require("../../core/enums/firebase_column_enums");
let MenuService = class MenuService {
    constructor() {
        this.network = firebase_services_1.FirebaseServices.instance;
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
    async createMenuElement(params) {
        try {
            const imagePath = await this.network.setImageToStorage(params.image, params.name, "menu");
            params.image = imagePath;
            await this.network.setData(params, firebase_column_enums_1.FirebaseColumns.MENU, params.name);
            return params;
        }
        catch (error) {
            throw Error(error);
        }
    }
    async updateMenuElement(params) {
        try {
            let dataForSend = {};
            params.price = params.price;
            params.materials = params.materials;
            if (params.image != "") {
                const imagePath = await this.network.setImageToStorage(params.image, params.name, "menu");
                params.image = imagePath;
                dataForSend = {
                    image: params.image,
                    price: params.price,
                    materials: params.materials,
                };
            }
            else {
                dataForSend = {
                    price: params.price,
                    materials: params.materials,
                };
            }
            await this.network.updateDocument(firebase_column_enums_1.FirebaseColumns.MENU, params.name, dataForSend);
            return params;
        }
        catch (error) {
            throw Error(error);
        }
    }
    async deleteMenuElement(params) {
        try {
            await this.network.deleteDoc(firebase_column_enums_1.FirebaseColumns.MENU, params.name);
            await this.network.deleteImageFromStorage(params.name, "menu");
            return params;
        }
        catch (error) {
            throw Error(error);
        }
    }
    async getMenuItem(itemName) {
        const rawData = (await this.network.getDoc(firebase_column_enums_1.FirebaseColumns.MENU, itemName)).data();
        const response = new menu_item_dto_1.MenuItemDto().fromJsonWithReturn(rawData);
        return response;
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)()
], MenuService);
//# sourceMappingURL=menu.service.js.map