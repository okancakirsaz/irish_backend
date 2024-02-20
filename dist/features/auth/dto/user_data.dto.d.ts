import { PostDto } from "src/features/community/dto/post.dto";
import { FavoriteFoodDto } from "src/features/user/dto/favorite_food.dto";
import { UserScoreDto } from "src/features/user/dto/user_score.dto";
export declare class UserDataDto {
    name: string;
    email: string;
    password?: string;
    token: string;
    gender: string;
    uid: string;
    profileImage?: string;
    isUserBanned: boolean;
    phoneNumber: string;
    posts: Array<PostDto>;
    scores: Array<UserScoreDto>;
    favoriteFoods: Array<FavoriteFoodDto>;
    isAnonym: boolean;
    fromJson(json: any): void;
    fromJsonWithReturn(json: any): UserDataDto;
    toJson(): Record<string, any>;
}
