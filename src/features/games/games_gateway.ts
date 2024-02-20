import { MessageBody,OnGatewayDisconnect,SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io';
import { DuelInviteDto } from "src/features/games/dto/duel_invite.dto";

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
    this.server.emit(body.gameId,body);
}

@SubscribeMessage("game_room_done")
handleGameRoomDone(@MessageBody() body:string){
this.server.emit(body,true);
}
} 