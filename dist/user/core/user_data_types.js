"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFavoriteFoods = exports.UserScores = exports.UserPosts = exports.IUserDataTypes = void 0;
class IUserDataTypes {
}
exports.IUserDataTypes = IUserDataTypes;
class UserPosts extends IUserDataTypes {
    constructor() {
        super(...arguments);
        this.dataType = 'posts';
    }
}
exports.UserPosts = UserPosts;
class UserScores extends IUserDataTypes {
    constructor() {
        super(...arguments);
        this.dataType = 'scores';
    }
}
exports.UserScores = UserScores;
class UserFavoriteFoods extends IUserDataTypes {
    constructor() {
        super(...arguments);
        this.dataType = 'favoriteFoods';
    }
}
exports.UserFavoriteFoods = UserFavoriteFoods;
//# sourceMappingURL=user_data_types.js.map