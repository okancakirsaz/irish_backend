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
exports.GamesService = void 0;
const common_1 = require("@nestjs/common");
const event_dto_1 = require("./dto/event.dto");
const firebase_services_1 = require("../../core/firebase_services");
const firebase_column_enums_1 = require("../../core/enums/firebase_column_enums");
const web_socket_gateway_1 = require("../../core/web_socket_gateway");
const game_room_dto_1 = require("./dto/game_room.dto");
const games_gateway_1 = require("./games_gateway");
let GamesService = class GamesService {
    constructor(socket, gameSocket) {
        this.socket = socket;
        this.gameSocket = gameSocket;
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
    async startEvent(params) {
        try {
            params.isStarted = true;
            await this.network.updateDocument(firebase_column_enums_1.FirebaseColumns.EVENTS, params.eventId, params);
            this.socket.handleEventStarted(`Etknlik başladı: ${params.eventName}`);
            return params;
        }
        catch (error) {
            throw Error(error);
        }
    }
    async setGameRoom(params, isChallenger) {
        if (isChallenger) {
            await this.network.updateDocument(firebase_column_enums_1.FirebaseColumns.GAME_ROOMS, params.gameId, { "challengerUserScore": params.challengerUserScore });
        }
        else {
            await this.network.updateDocument(firebase_column_enums_1.FirebaseColumns.GAME_ROOMS, params.gameId, { "challengedUserScore": params.challengedUserScore });
        }
        return params;
    }
    async createGameRoom(params) {
        await this.network.setData(params, firebase_column_enums_1.FirebaseColumns.GAME_ROOMS, params.gameId);
        return params;
    }
    async getGameRoom(params) {
        const response = await this.network.getDoc(firebase_column_enums_1.FirebaseColumns.GAME_ROOMS, params.gameId);
        return new game_room_dto_1.GameRoomDto().fromJsonWithReturn(response.data());
    }
};
exports.GamesService = GamesService;
exports.GamesService = GamesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [web_socket_gateway_1.SocketGateway, games_gateway_1.GamesGateway])
], GamesService);
//# sourceMappingURL=games.service.js.map