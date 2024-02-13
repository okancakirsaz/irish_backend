"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesService = void 0;
const common_1 = require("@nestjs/common");
const event_dto_1 = require("./dto/event.dto");
const firebase_services_1 = require("../../core/firebase_services");
const firebase_column_enums_1 = require("../../core/enums/firebase_column_enums");
let GamesService = class GamesService {
    constructor() {
        this.network = firebase_services_1.FirebaseServices.instance;
    }
    async getActiveEvents() {
        const response = await this.network.getDocs(firebase_column_enums_1.FirebaseColumns.EVENTS);
        let responseAsList = [];
        response.forEach((data) => {
            const dto = new event_dto_1.EventDto();
            dto.fromJson(data);
            responseAsList.push(dto);
        });
        return responseAsList;
    }
    async createEvent(params) {
        try {
            await this.network.setData(params, firebase_column_enums_1.FirebaseColumns.EVENTS, params.eventId);
            return params;
        }
        catch (error) {
            throw Error(error);
        }
    }
    async deleteEvent(params) {
        try {
            await this.network.deleteDoc(firebase_column_enums_1.FirebaseColumns.EVENTS, params.eventId);
            return params;
        }
        catch (error) {
            throw Error(error);
        }
    }
};
exports.GamesService = GamesService;
exports.GamesService = GamesService = __decorate([
    (0, common_1.Injectable)()
], GamesService);
//# sourceMappingURL=games.service.js.map