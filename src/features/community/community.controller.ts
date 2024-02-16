import { Body, Controller, Get, Post } from "@nestjs/common";
import { CommunityService } from "./community.service";
import { PostDto } from "./dto/post.dto";
import { GetMorePostDto } from "./dto/get_more_posts_req.dto";
import { UserDataDto } from "../auth/dto/user_data.dto";
import { LiteUserDto } from "./dto/lite_user.dto";

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

    @Get("currently-in-irish-coffee")
    async getCustomers(){
       try {
        return await this.service.getCustomerList();
       } catch (error) {
        throw Error(error);
       } 
    }

    @Get('users')
   async getUsers():Promise<UserDataDto[]>{
        try {
            return await this.service.getAllUsers();
        } catch (error) {
            throw Error(error);
        } 
    }

    @Post('block-user')
    async blockUser(@Body() params:UserDataDto):Promise<UserDataDto>{
        try {
            return await this.service.blockUser(params)
        } catch (error) {
            throw Error(error);
        }
    }

    @Post('unblock-user')
    async unblockUser(@Body() params:UserDataDto):Promise<UserDataDto>{
        try {
            return await this.service.unblockUser(params)
        } catch (error) {
            throw Error(error);
        }
    }
}