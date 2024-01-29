import { PostDto } from "./dto/post.dto";
import { GetMorePostDto } from "./dto/get_more_posts_req.dto";
export declare class CommunityService {
    private network;
    sharePost(params: PostDto): Promise<PostDto>;
    private savePostToUserData;
    getCurrentPosts(): Promise<PostDto[]>;
    getMoreCommunityShares(params: GetMorePostDto): Promise<PostDto[]>;
}
