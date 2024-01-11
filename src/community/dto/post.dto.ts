import { LiteUserDto } from "./lite_user.dto"

export class PostDto{
    user:LiteUserDto
    description:string
    timestamp:string
    apiImage:string
    time:string
    id:string
    imageAsByte?:string
    
    fromJson(json){
      this.user= new LiteUserDto()
      this.user.fromJson(json['user'])
      this.description=json['description']
      this.apiImage=json['apiImage']
      this.time=json['time']
      this.timestamp=json['timestamp']
      this.id=json['id']
      this.imageAsByte=json['imageAsByte']
    }
}