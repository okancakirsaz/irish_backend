export interface UserDataDto {
    name: string;
    email: string;
    password: string;
    token: string;
    gender: string;
    profileImage?: string;
    phoneNumber: string;
    posts: Array<any>;
    scores: Array<any>;
    favoriteFoods: Array<any>;
}
