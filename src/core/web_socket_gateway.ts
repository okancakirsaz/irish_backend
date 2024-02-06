import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server,Socket } from 'socket.io';
import { OrderRequestDto } from "src/features/order/dto/order_request.dto";

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {

@WebSocketServer() 
server;


handleDisconnect() {

}

handleConnection(@MessageBody() msg:string, @ConnectedSocket() client:Socket) {
   
}

//TODO: I cant receive data solve it

@SubscribeMessage("send_message")
handleOrderReceivedCase(@MessageBody() message:OrderRequestDto){
    console.log(message);
    this.server.emit("send_message",message);
}

}