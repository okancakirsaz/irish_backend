export interface UserDataDto{
    name:string
    email:string
    password:string
    token:string
    gender:string
    profileImage?:string
    phoneNumber:string
    //TODO: Post DTO here
    posts:Array<any>
    //TODO: Scores DTO here
    scores:Array<any>
    //TODO: Favorite foods DTO here
    favoriteFoods:Array<any>
}