import { Server } from 'socket.io';
import { OrderResponseDto } from "src/features/order/dto/order_response.dto";
export declare class SocketGateway {
    server: Server;
    handleOrderReceivedCase(body: OrderResponseDto): void;
}
