"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiteUserDto = void 0;
class LiteUserDto {
    fromJson(json) {
        this.token = json['token'];
        this.uid = json['uid'];
        this.name = json['name'];
        this.profileImage = json['profileImage'];
        this.gender = json['gender'];
    }
}
exports.LiteUserDto = LiteUserDto;
//# sourceMappingURL=lite_user.dto.js.map