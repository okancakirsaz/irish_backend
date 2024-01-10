export class UserDataDto{
    name:string
    email:string
    password?:string
    token:string
    gender:string
    uid:string
    profileImage?:string
    phoneNumber:string
    //TODO: Post DTO here
    posts:Array<any>
    //TODO: Scores DTO here
    scores:Array<any>
    //TODO: Favorite foods DTO here
    favoriteFoods:Array<any>

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
    }
}