"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserScoreDto = void 0;
class UserScoreDto {
    fromJsonWithReturn(json) {
        const data = new UserScoreDto();
        data.userId = json['userId'];
        data.userName = json['userName'];
        data.challengedUserName = json['challengedUserName'];
        data.game = json['game'];
        data.isWinned = json['isWinned'];
        return data;
    }
}
exports.UserScoreDto = UserScoreDto;
//# sourceMappingURL=user_score.dto.js.map