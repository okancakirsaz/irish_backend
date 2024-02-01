import { PostDto } from "src/features/community/dto/post.dto"
import { FavoriteFoodDto } from "src/features/user/dto/favorite_food.dto"
import { UserSettingsDto } from "src/features/user/dto/user_settings.dto"

export class UserDataDto{
    name:string
    email:string
    password?:string
    token:string
    gender:string
    uid:string
    profileImage?:string
    phoneNumber:string
    posts:Array<PostDto>
    //TODO: Scores DTO here
    scores:Array<any>
    favoriteFoods:Array<FavoriteFoodDto>
    isAnonym:boolean

    fromJson(json){
        this.name=json["name"];
        this.email=json["email"];
        this.token=json["token"];
        this.gender=json["gender"];
        this.uid=json["uid"];
        this.profileImage=json["profileImage"]??null;
        this.phoneNumber=json["phoneNumber"];
        this.posts=json["posts"];
        this.scores=json["scores"];
        this.favoriteFoods=json["favoriteFoods"];
        this.isAnonym=json['isAnonym']
    }

    toJson():Record<string,any>{
        return {
            'name':this.name,
            'email':this.email,
            'token':this.token,
            'gender':this.gender,
            'uid':this.uid,
            'profileImage':this.profileImage,
            'phoneNumber':this.phoneNumber,
            'posts':this.posts,
            'scores':this.scores,
            'favoriteFoods':this.favoriteFoods,
            'isAnonym':this.isAnonym
        }
    }
}