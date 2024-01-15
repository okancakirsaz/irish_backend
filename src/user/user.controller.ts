import { Controller, Get, Header, Headers } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserFavoriteFoods, UserPosts, UserScores } from "./core/user_data_types";

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
}
