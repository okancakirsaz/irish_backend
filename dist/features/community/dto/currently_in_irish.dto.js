"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentlyInIrishDto = void 0;
class CurrentlyInIrishDto {
    toJson() {
        return {
            "name": this.name,
            "gender": this.gender,
            "isAnonym": this.isAnonym,
            "token": this.token,
            "timestamp": this.timestamp,
            "uid": this.uid,
            "profileImage": this.profileImage
        };
    }
    fromJsonWithReturn(json) {
        const data = new CurrentlyInIrishDto();
        data.gender = json["gender"];
        data.isAnonym = json["isAnonym"];
        data.name = json["name"];
        data.timestamp = json['timestamp'];
        data.profileImage = json["profileImage"];
        data.token = json["token"];
        data.uid = json["uid"];
        return data;
    }
}
exports.CurrentlyInIrishDto = CurrentlyInIrishDto;
//# sourceMappingURL=currently_in_irish.dto.js.map