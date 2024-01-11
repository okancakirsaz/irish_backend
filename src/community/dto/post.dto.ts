import { LiteUserDto } from "./lite_user.dto"

export class PostDto{
    user:LiteUserDto
    description:string
    apiImage:string
    time:string
    id:string
    imageAsByte?:string
}