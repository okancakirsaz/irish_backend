export abstract class IUserDataTypes {
    dataType:string;
}
export class UserPosts extends IUserDataTypes {
    dataType:string='posts';
}
export class UserScores extends IUserDataTypes {
    dataType: string='scores';
}
export class UserFavoriteFoods extends IUserDataTypes {
    dataType: string='favoriteFoods';
}
