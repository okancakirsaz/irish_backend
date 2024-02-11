"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorLogDto = void 0;
class ErrorLogDto {
    toJson() {
        return {
            "reason": this.reason,
            "date": this.date
        };
    }
}
exports.ErrorLogDto = ErrorLogDto;
//# sourceMappingURL=error_log.dto.js.map