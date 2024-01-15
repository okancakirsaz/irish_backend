import { UserService } from "./user.service";
export declare class UserController {
    private readonly service;
    constructor(service: UserService);
    getUserPosts(header: any): Promise<import("../community/dto/post.dto").PostDto[]>;
    getUserScores(header: any): Promise<import("../community/dto/post.dto").PostDto[]>;
    getUserFavoriteFoods(header: any): Promise<import("../community/dto/post.dto").PostDto[]>;
}
