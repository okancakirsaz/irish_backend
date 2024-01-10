import { UserDataDto } from "./dto/user_data.dto";
import { LogInRequestDto } from "./dto/log_in_request.dto";
import { LogInErrorDto } from "./dto/log_in_error.dto";
import { ForgotPasswordRequestDto } from "./dto/forgot_password_request.dto";
import { ForgotPasswordResponseDto } from "./dto/forgot_password_response.dto";
export declare class AuthService {
    signUp(userData: UserDataDto): Promise<UserDataDto>;
    logIn(params: LogInRequestDto): Promise<UserDataDto | LogInErrorDto>;
    forgotPassword(params: ForgotPasswordRequestDto): Promise<ForgotPasswordResponseDto>;
}
