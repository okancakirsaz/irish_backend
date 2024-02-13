import { Body, Controller, Get, Post } from "@nestjs/common";
import { GamesService } from "./games.service";
import { EventDto } from "./dto/event.dto";

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

  @Post('create-event')
  async createEvent(@Body() params:EventDto){
    try {
     return await this.service.createEvent(params);   
    } catch (error) {
        throw Error(error);
    }
  }

  @Post('delete-event')
  async deleteEvent(@Body() params:EventDto){
    try {
     return await this.service.deleteEvent(params);   
    } catch (error) {
        throw Error(error);
    }
  }
}
 