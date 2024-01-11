import { Body, Controller, Get, Post } from "@nestjs/common";
import { CommunityService } from "./community.service";
import { PostDto } from "./dto/post.dto";

@Controller('community')
export class CommunityController{
    constructor(private readonly service:CommunityService){}

    @Post('share-post')
    async sharePost(@Body() params:PostDto){
        try {
            await this.service.sharePost(params);
            return params;
        } catch (error) {
            throw Error(error);
        }
    }
}