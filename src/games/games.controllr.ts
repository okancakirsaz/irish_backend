import { Controller, Get } from "@nestjs/common";
import { GamesService } from "./games.service";

@Controller("games")
export class GamesController {
  constructor(private readonly service: GamesService) {}

  @Get('get-active-events')
  async getEvents(){
    try {
     return await this.service.getActiveEvents();   
    } catch (error) {
        throw Error(error);
    }
  }
}
