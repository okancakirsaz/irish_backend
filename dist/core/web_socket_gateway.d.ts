import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Socket } from 'socket.io';
import { OrderRequestDto } from "src/features/order/dto/order_request.dto";
export declare class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: any;
    handleDisconnect(): void;
    handleConnection(msg: string, client: Socket): void;
    handleOrderReceivedCase(message: OrderRequestDto): void;
}
