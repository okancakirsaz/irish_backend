import { PostDto } from "src/features/community/dto/post.dto";
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
    isAnonym: boolean;
    fromJson(json: any): void;
    toJson(): Record<string, any>;
}
