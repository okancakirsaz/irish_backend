import { Body, Controller, Get, Post } from "@nestjs/common";
import { GamesService } from "./games.service";
import { EventDto } from "./dto/event.dto";
import { GameRoomDto } from "./dto/game_room.dto";
import { DuelInviteDto } from "./dto/duel_invite.dto";

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

  @Post('start-event')
  async startEvent(@Body() params:EventDto){
    try {
      return await this.service.startEvent(params);   
     } catch (error) {
         throw Error(error);
     }
  }

  @Post('create-game-room')
  async createGameRoom(@Body() params:GameRoomDto){
    try {
      return await this.service.createGameRoom(params);   
     } catch (error) {
         throw Error(error);
     }
  }

  @Post('set-game-room-challenged')
  async setGameRoomChallenged(@Body() params:GameRoomDto){
    try {
      return await this.service.setGameRoom(params,false);   
     } catch (error) {
         throw Error(error);
     }
  }

  @Post('set-game-room-challenger')
  async setGameRoomChallenger(@Body() params:GameRoomDto){
    try {
      return await this.service.setGameRoom(params,true);   
     } catch (error) {
         throw Error(error);
     }
  }

  @Post('get-game-room')
  async getGameRoom(@Body() params:DuelInviteDto){
    try {
      return await this.service.getGameRoom(params);   
     } catch (error) {
         throw Error(error);
     }
  }

}
 