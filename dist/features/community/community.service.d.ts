import { PostDto } from "./dto/post.dto";
import { UserDataDto } from "src/features/auth/dto/user_data.dto";
import { GetMorePostDto } from "./dto/get_more_posts_req.dto";
import { CurrentlyInIrishDto } from "./dto/currently_in_irish.dto";
export declare class CommunityService {
    private network;
    sharePost(params: PostDto): Promise<PostDto>;
    private savePostToUserData;
    getCurrentPosts(): Promise<PostDto[]>;
    getMoreCommunityShares(params: GetMorePostDto): Promise<PostDto[]>;
    getAllUsers(): Promise<UserDataDto[]>;
    blockUser(params: UserDataDto): Promise<UserDataDto>;
    private deleteUserPostsInCommunity;
    unblockUser(params: UserDataDto): Promise<UserDataDto>;
    private addUserPostsToCommunityAfterUnblock;
    getCustomerList(): Promise<CurrentlyInIrishDto[]>;
}
