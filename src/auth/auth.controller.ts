import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from './auth.service';
import { UserDataDto } from "./user_data.dto";

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

}