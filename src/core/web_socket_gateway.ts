import { MessageBody,SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io';
import { OrderResponseDto } from "src/features/order/dto/order_response.dto";

@WebSocketGateway()
export class SocketGateway{

@WebSocketServer() 
server:Server = new Server();


@SubscribeMessage("new_order")
handleOrderReceivedCase(@MessageBody() body:OrderResponseDto){
    this.server.emit("new_order",body);
}

}