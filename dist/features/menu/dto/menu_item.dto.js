"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemDto = void 0;
class MenuItemDto {
    fromJson(json) {
        this.name = json['name'];
        this.price = json['price'];
        this.image = json['image'];
        this.materials = json['materials'];
    }
    fromJsonWithReturn(json) {
        const object = new MenuItemDto();
        object.name = json['name'];
        object.price = json['price'];
        object.image = json['image'];
        object.materials = json['materials'];
        return object;
    }
    toJson() {
        return {
            "name": this.name,
            "price": this.price,
            "image": this.image,
            "materials": this.materials
        };
    }
}
exports.MenuItemDto = MenuItemDto;
//# sourceMappingURL=menu_item.dto.js.map