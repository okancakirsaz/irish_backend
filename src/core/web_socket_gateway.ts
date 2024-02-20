import { MessageBody,SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io';
import { CurrentlyInIrishDto } from "src/features/community/dto/currently_in_irish.dto";
import { OrderResponseDto } from "src/features/order/dto/order_response.dto";

@WebSocketGateway()
export class SocketGateway{

@WebSocketServer() 
server:Server = new Server();




@SubscribeMessage("new_order")
handleOrderReceivedCase(@MessageBody() body:OrderResponseDto){
    this.server.emit("new_order",body);
}

@SubscribeMessage("new_customer")
handleNewCustomer(@MessageBody() body:CurrentlyInIrishDto){
    this.server.emit("new_customer",body);
}

@SubscribeMessage("delete_customer")
handleDeleteCustomer(@MessageBody() body:CurrentlyInIrishDto){
    this.server.emit("delete_customer",body);
}

@SubscribeMessage("user_banned")
handleBannedUser(@MessageBody() body:string){
    //body = user id
    this.server.emit("user_banned",body);
}

@SubscribeMessage("event_started")
handleEventStarted(@MessageBody() body:string){
    this.server.emit("event_started",body);
}

}