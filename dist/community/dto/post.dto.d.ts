import { LiteUserDto } from "./lite_user.dto";
export declare class PostDto {
    user: LiteUserDto;
    description: string;
    timestamp: string;
    apiImage: string;
    time: string;
    id: string;
    imageAsByte?: string;
    fromJson(json: any): void;
}
