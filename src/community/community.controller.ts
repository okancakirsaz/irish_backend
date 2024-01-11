import { Body, Controller, Get, Post } from "@nestjs/common";
import { CommunityService } from "./community.service";
import { PostDto } from "./dto/post.dto";
import { GetMorePostDto } from "./dto/get_more_posts_req.dto";

@Controller('community')
export class CommunityController{
    constructor(private readonly service:CommunityService){}

    @Post('share-post')
    async sharePost(@Body() params:PostDto){
        try {
            return await this.service.sharePost(params);
        } catch (error) {
            throw Error(error);
        }
    }

    @Get("community-shares")
    async getCommunityShares():Promise<PostDto[]>{
        return await this.service.getCurrentPosts();
    }

    @Post("get-more-community-shares")
    async getMoreCommunityShares(@Body() params:GetMorePostDto):Promise<PostDto[]>{
        return await this.service.getMoreCommunityShares(params)
    }
}