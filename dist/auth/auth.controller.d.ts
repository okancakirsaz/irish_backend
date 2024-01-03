import { AuthService } from './auth.service';
import { UserDataDto } from "./user_data.dto";
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    signUp(params: UserDataDto): Promise<any>;
}
