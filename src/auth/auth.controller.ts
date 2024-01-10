import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from './auth.service';
import { UserDataDto } from "./dto/user_data.dto";
import { LogInRequestDto } from './dto/log_in_request.dto';
import { ForgotPasswordRequestDto } from "./dto/forgot_password_request.dto";

@Controller('auth')
export class AuthController{
    constructor(private readonly service:AuthService){}

    @Post('sign-up')
    async signUp(@Body() params:UserDataDto){
    try {
    return await this.service.signUp(params);
    } catch (error) {
    throw Error(error);
    }
    }
    @Post("log-in")
    async logIn(@Body() params:LogInRequestDto){
        try {
            return await this.service.logIn(params);
        } catch (error) {
            throw Error(error)
        }
    }

    @Post("forgot-password")
    async forgotPassword(@Body() params:ForgotPasswordRequestDto){
        try {
            return await this.service.forgotPassword(params);
        } catch (error) {
            throw Error(error)
        }
    }
}