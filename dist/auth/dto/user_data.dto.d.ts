export declare class UserDataDto {
    name: string;
    email: string;
    password?: string;
    token: string;
    gender: string;
    uid: string;
    profileImage?: string;
    phoneNumber: string;
    posts: Array<any>;
    scores: Array<any>;
    favoriteFoods: Array<any>;
    fromJson(json: any): void;
}
