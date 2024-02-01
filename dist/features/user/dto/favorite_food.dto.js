"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteFoodDto = void 0;
class FavoriteFoodDto {
    fromJson(json) {
        this.foodName = json['foodName'];
        this.count = json['count'];
        this.photo['photo'];
    }
    toJson() {
        return {
            "foodName": this.foodName,
            "count": this.count,
            "photo": this.photo
        };
    }
}
exports.FavoriteFoodDto = FavoriteFoodDto;
//# sourceMappingURL=favorite_food.dto.js.map