import { PostDto } from "src/community/dto/post.dto";
export declare class UserDataDto {
    name: string;
    email: string;
    password?: string;
    token: string;
    gender: string;
    uid: string;
    profileImage?: string;
    phoneNumber: string;
    posts: Array<PostDto>;
    scores: Array<any>;
    favoriteFoods: Array<any>;
    fromJson(json: any): void;
    toJson(): Record<string, any>;
}
