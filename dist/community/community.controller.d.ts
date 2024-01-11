import { CommunityService } from "./community.service";
import { PostDto } from "./dto/post.dto";
import { GetMorePostDto } from "./dto/get_more_posts_req.dto";
export declare class CommunityController {
    private readonly service;
    constructor(service: CommunityService);
    sharePost(params: PostDto): Promise<PostDto>;
    getCommunityShares(): Promise<PostDto[]>;
    getMoreCommunityShares(params: GetMorePostDto): Promise<PostDto[]>;
}
