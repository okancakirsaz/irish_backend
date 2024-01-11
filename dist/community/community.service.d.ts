import { PostDto } from "./dto/post.dto";
import { FirebaseInit } from "src/core/firebase_init";
export declare class CommunityService {
    network: FirebaseInit;
    sharePost(params: PostDto): Promise<void>;
    private savePostImageToStorage;
}
