import { PostDto } from "src/community/dto/post.dto";
import { IUserDataTypes } from "./core/user_data_types";
import { UserSettingsDto } from "./dto/user_settings.dto";
import { ChangeProfilePhotoDto } from "./dto/change_profile_photo.dto";
import { UidReqDto } from "./dto/uid_req.dto";
import { BooleanSingleResponseDto } from "./dto/boolean_single_response.dto";
import { PostDeleteReqDto } from "./dto/post_delete_req.dto";
export declare class UserService {
    private readonly network;
    getUserDatasFromToken(token: string, dataType: IUserDataTypes): Promise<PostDto[]>;
    getUserSettings(token: string): Promise<UserSettingsDto>;
    setNewUserSettings(params: UserSettingsDto, token: string): Promise<UserSettingsDto>;
    changeProfilePhoto(params: ChangeProfilePhotoDto): Promise<ChangeProfilePhotoDto>;
    deleteProfileImage(params: UidReqDto): Promise<BooleanSingleResponseDto>;
    deleteAccount(params: UidReqDto): Promise<BooleanSingleResponseDto>;
    deletePost(params: PostDeleteReqDto): Promise<BooleanSingleResponseDto>;
    private getUserData;
    private fetchUserSettings;
    private updateUserData;
    private setProfileImageToDb;
    private deleteUserProfileImageFromStorage;
    private deleteUserPosts;
    private getUserForDelete;
    private deleteUserFromAuthService;
}
