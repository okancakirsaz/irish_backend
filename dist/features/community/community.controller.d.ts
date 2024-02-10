import { CommunityService } from "./community.service";
import { PostDto } from "./dto/post.dto";
import { GetMorePostDto } from "./dto/get_more_posts_req.dto";
import { UserDataDto } from "../auth/dto/user_data.dto";
export declare class CommunityController {
    private readonly service;
    constructor(service: CommunityService);
    sharePost(params: PostDto): Promise<PostDto>;
    getCommunityShares(): Promise<PostDto[]>;
    getMoreCommunityShares(params: GetMorePostDto): Promise<PostDto[]>;
    getCustomers(): Promise<{
        name: string;
        gender: string;
        index: number;
        isAnonym: boolean;
        token: string;
        profileImage: string;
    }[]>;
    getUsers(): Promise<UserDataDto[]>;
    blockUser(params: UserDataDto): Promise<UserDataDto>;
    unblockUser(params: UserDataDto): Promise<UserDataDto>;
}
