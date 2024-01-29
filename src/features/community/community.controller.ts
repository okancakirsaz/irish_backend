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

    @Get("currently-in-irish-coffee")
    async getCustomers(){
    //TODO: This is a fake dataset. Do the logic!
    //TODO:Create customer data dto
        return [
            {
                "name":"Volkan Konak",
                "gender":"Erkek",
                "index":1,
                "isAnonym":false,
                "token":"UFC123JAOKF0P0ICJOJFOĞ0Q0J03UJVPOAS",
                "profileImage":"https://i.pinimg.com/236x/0f/74/81/0f7481fcf1051babffa8a03c34c24ea8.jpg"
            },
            {
                "name":"İrem Abdestsizyatmazoğulları",
                "gender":"Kadın",
                "index":2,
                "isAnonym":false,
                "token":"UFC123JAOKF0P0ICdas",
                "profileImage":null
            },
            {
                "name":"Süleyman Soyluluğutartışılıroğulları",
                "gender":"Belirtmek İstemiyorum",
                "index":3,
                "isAnonym":false,
                "token":"orspıucocy",
                "profileImage":null
            },
            {
                "name":"Keziban Materyılgörloğulları",
                "gender":"Kadın",
                "index":4,
                "isAnonym":true,
                "token":"saodsajfıhsaofp",
                "profileImage":null
            },
            {
                "name":"Bernand Redflag",
                "gender":"Belirtmek İstemiyorum",
                "index":5,
                "isAnonym":false,
                "token":"anasınıs2ktinekonominin",
                "profileImage":"https://abcgazetesi.com/d/news/8331.jpg"
            }
    ]
    }
}