"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDto = void 0;
class EventDto {
    fromJson(json) {
        this.eventId = json['eventId'],
            this.eventName = json['eventName'],
            this.eventTime = json['eventTime'],
            this.gameType = json['gameType'],
            this.isPysicalEvent = json['isPysicalEvent'];
    }
}
exports.EventDto = EventDto;
//# sourceMappingURL=event.dto.js.map