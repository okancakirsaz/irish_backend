import { Body, Controller, Get, Header, Headers, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserFavoriteFoods, UserPosts, UserScores } from "./core/user_data_types";
import { UserSettingsDto } from "./dto/user_settings.dto";
import { ChangeProfilePhotoDto } from "./dto/change_profile_photo.dto";
import { UidReqDto } from "./dto/uid_req.dto";

@Controller("user")
export class UserController {
  constructor(private readonly service: UserService) {}
  @Get("user-posts")
  async getUserPosts(@Headers() header) {
    try {
        return await this.service.getUserDatasFromToken(header['token'],new UserPosts())
    } catch (error) {
        throw Error(error);
    }
  }
  @Get('user-scores')
  async getUserScores(@Headers() header){
    try {
      return await this.service.getUserDatasFromToken(header['token'],new UserScores())
    } catch (error) {
        throw Error(error);
    }
  }

  @Get('user-foods')
  async getUserFavoriteFoods(@Headers() header){
    try {
      return await this.service.getUserDatasFromToken(header['token'],new UserFavoriteFoods())
    } catch (error) {
        throw Error(error);
    }
  }

  @Get('user-settings')
  async getUserSettings(@Headers() header){
    try {
      return await this.service.getUserSettings(header['token']);
    } catch (error) {
      throw Error(error);
    }
  }

  @Post('set-new-user-settings')
  async setNewUserSettings(@Body() params:UserSettingsDto,@Headers() headers){
    try {
      return this.service.setNewUserSettings(params,headers['token'])
    } catch (error) {
      throw Error(error);
    }
  }

  @Post('change-profile-photo')
  async changeProfilePhoto(@Body() params:ChangeProfilePhotoDto){
    try {
      return await this.service.changeProfilePhoto(params)
    } catch (error) {
      throw Error(error);
    }
  }

  @Post('delete-profile-image')
  async deleteProfilePhoto(@Body() params:UidReqDto){
    try {
      return await this.service.deleteProfileImage(params);
    } catch (error) {
      throw Error(error);
    }
  }
  @Post('delete-account')
  async deleteAccount(@Body() params:UidReqDto){
    try {
      return await this.service.deleteAccount(params);
    } catch (error) {
      throw Error(error);
    }
  }
}
