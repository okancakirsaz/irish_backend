import { UserService } from "./user.service";
import { UserSettingsDto } from "./dto/user_settings.dto";
import { ChangeProfilePhotoDto } from "./dto/change_profile_photo.dto";
import { UidReqDto } from "./dto/uid_req.dto";
import { PostDeleteReqDto } from "./dto/post_delete_req.dto";
import { UserScoreDto } from "./dto/user_score.dto";
export declare class UserController {
    private readonly service;
    constructor(service: UserService);
    getUserPosts(header: any): Promise<import("../community/dto/post.dto").PostDto[]>;
    getUserScores(header: any): Promise<import("../community/dto/post.dto").PostDto[]>;
    getUserFavoriteFoods(header: any): Promise<import("../community/dto/post.dto").PostDto[]>;
    getUserSettings(header: any): Promise<UserSettingsDto>;
    setNewUserSettings(params: UserSettingsDto, headers: any): Promise<UserSettingsDto>;
    changeProfilePhoto(params: ChangeProfilePhotoDto): Promise<ChangeProfilePhotoDto>;
    deleteProfilePhoto(params: UidReqDto): Promise<import("./dto/boolean_single_response.dto").BooleanSingleResponseDto>;
    deleteAccount(params: UidReqDto): Promise<import("./dto/boolean_single_response.dto").BooleanSingleResponseDto>;
    deletePost(params: PostDeleteReqDto): Promise<import("./dto/boolean_single_response.dto").BooleanSingleResponseDto>;
    checkIsUserBanned(params: UidReqDto): Promise<import("./dto/boolean_single_response.dto").BooleanSingleResponseDto>;
    updateUserScores(params: UserScoreDto): Promise<UserScoreDto>;
}
