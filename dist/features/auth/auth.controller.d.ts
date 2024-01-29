import { AuthService } from './auth.service';
import { UserDataDto } from "./dto/user_data.dto";
import { LogInRequestDto } from './dto/log_in_request.dto';
import { ForgotPasswordRequestDto } from "./dto/forgot_password_request.dto";
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    signUp(params: UserDataDto): Promise<UserDataDto>;
    logIn(params: LogInRequestDto): Promise<UserDataDto>;
    forgotPassword(params: ForgotPasswordRequestDto): Promise<import("./dto/forgot_password_response.dto").ForgotPasswordResponseDto>;
}
