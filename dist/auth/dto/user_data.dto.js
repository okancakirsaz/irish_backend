"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataDto = void 0;
class UserDataDto {
    fromJson(json) {
        this.name = json["name"];
        this.email = json["email"];
        this.token = json["token"];
        this.gender = json["gender"];
        this.uid = json["uid"];
        this.profileImage = json["profileImage"] ?? null;
        this.phoneNumber = json["phoneNumber"];
        this.posts = json["posts"];
        this.scores = json["scores"];
        this.favoriteFoods = json["favoriteFoods"];
    }
    toJson() {
        return {
            'name': this.name,
            'email': this.email,
            'token': this.token,
            'gender': this.gender,
            'uid': this.uid,
            'profileImage': this.profileImage,
            'phoneNumber': this.phoneNumber,
            'posts': this.posts,
            'scores': this.scores,
            'favoriteFoods': this.favoriteFoods
        };
    }
}
exports.UserDataDto = UserDataDto;
//# sourceMappingURL=user_data.dto.js.map