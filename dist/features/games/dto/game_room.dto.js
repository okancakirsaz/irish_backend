"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRoomDto = void 0;
class GameRoomDto {
    fromJsonWithReturn(json) {
        const data = new GameRoomDto();
        data.challengedUserId = json['challengedUserId'];
        data.challengedUserName = json['challengedUserName'];
        data.challengedUserScore = json['challengedUserScore'];
        data.challengerUserId = json['challengerUserId'];
        data.challengerUserName = json['challengerUserName'];
        data.challengerUserScore = json['challengerUserScore'];
        data.gameId = json['gameId'];
        return data;
    }
}
exports.GameRoomDto = GameRoomDto;
//# sourceMappingURL=game_room.dto.js.map