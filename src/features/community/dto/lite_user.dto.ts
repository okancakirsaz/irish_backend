export class LiteUserDto{
    token:string
    uid:string
    name:string
    profileImage:string
    gender:string

    fromJson(json){
        this.token=json['token']
        this.uid=json['uid']
        this.name=json['name']
        this.profileImage=json['profileImage']
        this.gender=json['gender']
    }
}