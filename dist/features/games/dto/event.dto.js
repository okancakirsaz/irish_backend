"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDto = void 0;
class EventDto {
    fromJson(json) {
        this.eventId = json['eventId'],
            this.award = json['award'],
            this.winner = json['winner'],
            this.eventName = json['eventName'],
            this.eventTime = json['eventTime'],
            this.gameType = json['gameType'],
            this.isStarted = json['isStarted'],
            this.isPysicalEvent = json['isPysicalEvent'];
    }
}
exports.EventDto = EventDto;
//# sourceMappingURL=event.dto.js.map