"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDto = void 0;
const lite_user_dto_1 = require("./lite_user.dto");
class PostDto {
    fromJson(json) {
        this.user = new lite_user_dto_1.LiteUserDto();
        this.user.fromJson(json['user']);
        this.description = json['description'];
        this.apiImage = json['apiImage'];
        this.time = json['time'];
        this.timestamp = json['timestamp'];
        this.id = json['id'];
        this.imageAsByte = json['imageAsByte'];
    }
}
exports.PostDto = PostDto;
//# sourceMappingURL=post.dto.js.map