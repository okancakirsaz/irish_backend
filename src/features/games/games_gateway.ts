import { MessageBody,SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io';
import { DuelInviteDto } from "src/features/games/dto/duel_invite.dto";
import { GameRoomDto } from "./dto/game_room.dto";
import { GamesService } from "./games.service";

@WebSocketGateway()
export class GamesGateway{


@WebSocketServer() 
server:Server = new Server();



@SubscribeMessage("duel_invite")
handleDuelInvite(@MessageBody() body:DuelInviteDto){
    this.server.emit(`Duel Invite:${body.challengedUserId}`,body);
}

@SubscribeMessage("duel_response")
handleDuelAccepted(@MessageBody() body:DuelInviteDto){
    this.server.emit(`Duel Response:${body.challengerUserId}`,body);
}

@SubscribeMessage("game_started")
handleGameStarted(@MessageBody() body:DuelInviteDto){
    this.server.emit(`Game Started:${body.gameId}`,body);
}


} 