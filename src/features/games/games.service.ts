import { Injectable } from "@nestjs/common";
import { EventDto } from "./dto/event.dto";
import { FirebaseServices } from "src/core/firebase_services";
import { FirebaseColumns } from "src/core/enums/firebase_column_enums";
import { SocketGateway } from "src/core/web_socket_gateway";
import { GameRoomDto } from "./dto/game_room.dto";
import { DuelInviteDto } from "./dto/duel_invite.dto";
import { GamesGateway } from "./games_gateway";

@Injectable()
export class GamesService {
  constructor(private readonly socket: SocketGateway,private readonly gameSocket:GamesGateway) {}

  private readonly network = FirebaseServices.instance;
  async getActiveEvents(): Promise<EventDto[]> {
    const response = await this.network.getDocs(FirebaseColumns.EVENTS);
    let responseAsList: EventDto[] = [];
    response.forEach((data) => {
      const dto: EventDto = new EventDto();
      dto.fromJson(data);
      responseAsList.push(dto);
    });
    return responseAsList;
  }

  async createEvent(params: EventDto): Promise<EventDto> {
    try {
      await this.network.setData(
        params,
        FirebaseColumns.EVENTS,
        params.eventId
      );
      return params;
    } catch (error) {
      throw Error(error);
    }
  }

  async deleteEvent(params: EventDto): Promise<EventDto> {
    try {
      await this.network.deleteDoc(FirebaseColumns.EVENTS, params.eventId);
      return params;
    } catch (error) {
      throw Error(error);
    }
  }

  async startEvent(params: EventDto): Promise<EventDto> {
    try {
      params.isStarted = true;
      await this.network.updateDocument(
        FirebaseColumns.EVENTS,
        params.eventId,
        params
      );
      this.socket.handleEventStarted(`Etknlik başladı: ${params.eventName}`);
      return params;
    } catch (error) {
      throw Error(error);
    }
  }

  async setGameRoom(params: GameRoomDto): Promise<GameRoomDto> {
    try {
      if (params.challengedUserScore == null) {
        await this.network.updateDocument(
          FirebaseColumns.GAME_ROOMS,
          params.gameId,
          {"challengerUserScore":params.challengerUserScore}
        );
        await this.setIsGameRoomDone(params.gameId);
      } else {
        await this.network.updateDocument(
          FirebaseColumns.GAME_ROOMS,
          params.gameId,
          {"challengedUserScore":params.challengedUserScore}
        );
        await this.setIsGameRoomDone(params.gameId);
      }
      
      return params;
    } catch (_) {
    //We using catch for is document doesn't exist case
      await this.network.setData(
        params,
        FirebaseColumns.GAME_ROOMS,
        params.gameId
      );
      await this.setIsGameRoomDone(params.gameId);
      return params;
    }
  }

private async setIsGameRoomDone(roomId:string){
    const rawData = await this.network.getDoc(FirebaseColumns.GAME_ROOMS,roomId);
    const gameRoom:GameRoomDto = new GameRoomDto().fromJsonWithReturn(rawData.data())
    if(gameRoom.challengedUserScore!=null&&gameRoom.challengerUserScore!=null){
        this.gameSocket.handleGameRoomDone(gameRoom.gameId);
    }
}

async getGameRoom(params:DuelInviteDto):Promise<GameRoomDto>{
    const response = await this.network.getDoc(FirebaseColumns.GAME_ROOMS,params.gameId);
    return new GameRoomDto().fromJsonWithReturn(response.data());

}
}
