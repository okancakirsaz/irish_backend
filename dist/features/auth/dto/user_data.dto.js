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
        this.isUserBanned = json['isUserBanned'];
        this.phoneNumber = json["phoneNumber"];
        this.posts = json["posts"];
        this.scores = json["scores"];
        this.favoriteFoods = json["favoriteFoods"];
        this.isAnonym = json['isAnonym'];
    }
    fromJsonWithReturn(json) {
        const element = new UserDataDto();
        element.name = json["name"];
        element.email = json["email"];
        element.token = json["token"];
        element.gender = json["gender"];
        element.uid = json["uid"];
        element.profileImage = json["profileImage"] ?? null;
        element.isUserBanned = json['isUserBanned'];
        element.phoneNumber = json["phoneNumber"];
        element.posts = json["posts"];
        element.scores = json["scores"];
        element.favoriteFoods = json["favoriteFoods"];
        element.isAnonym = json['isAnonym'];
        return element;
    }
    toJson() {
        return {
            'name': this.name,
            'email': this.email,
            'token': this.token,
            'gender': this.gender,
            'uid': this.uid,
            'isUserBanned': this.isUserBanned,
            'profileImage': this.profileImage,
            'phoneNumber': this.phoneNumber,
            'posts': this.posts,
            'scores': this.scores,
            'favoriteFoods': this.favoriteFoods,
            'isAnonym': this.isAnonym
        };
    }
}
exports.UserDataDto = UserDataDto;
//# sourceMappingURL=user_data.dto.js.map