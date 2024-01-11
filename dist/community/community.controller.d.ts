import { CommunityService } from "./community.service";
import { PostDto } from "./dto/post.dto";
export declare class CommunityController {
    private readonly service;
    constructor(service: CommunityService);
    sharePost(params: PostDto): Promise<PostDto>;
}
