import { PostDto } from "src/community/dto/post.dto";
import { IUserDataTypes } from "./core/user_data_types";
export declare class UserService {
    private readonly network;
    getUserDatasFromToken(token: string, dataType: IUserDataTypes): Promise<PostDto[]>;
}
