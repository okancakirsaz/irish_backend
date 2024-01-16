import { PostDto } from "src/community/dto/post.dto";
import { IUserDataTypes } from "./core/user_data_types";
import { UserSettingsDto } from "./dto/user_settings.dto";
import { ChangeProfilePhotoDto } from "./dto/change_profile_photo.dto";
import { UidReqDto } from "./dto/uid_req.dto";
import { BooleanSingleResponseDto } from "./dto/boolean_single_response.dto";
export declare class UserService {
    private readonly network;
    getUserDatasFromToken(token: string, dataType: IUserDataTypes): Promise<PostDto[]>;
    getUserSettings(token: string): Promise<UserSettingsDto>;
    private getUserData;
    private fetchUserSettings;
    setNewUserSettings(params: UserSettingsDto, token: string): Promise<UserSettingsDto>;
    private updateUserData;
    changeProfilePhoto(params: ChangeProfilePhotoDto): Promise<ChangeProfilePhotoDto>;
    private setProfileImageToDb;
    deleteProfileImage(params: UidReqDto): Promise<BooleanSingleResponseDto>;
    deleteAccount(params: UidReqDto): Promise<BooleanSingleResponseDto>;
    private deleteUserProfileImageFromStorage;
    private deleteUserPosts;
    private getUserForDelete;
    private deleteUserFromAuthService;
}
