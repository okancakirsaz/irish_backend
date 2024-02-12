import { Server } from 'socket.io';
import { CurrentlyInIrishDto } from "src/features/community/dto/currently_in_irish.dto";
import { OrderResponseDto } from "src/features/order/dto/order_response.dto";
export declare class SocketGateway {
    server: Server;
    handleOrderReceivedCase(body: OrderResponseDto): void;
    handleNewCustomer(body: CurrentlyInIrishDto): void;
    handleDeleteCustomer(body: CurrentlyInIrishDto): void;
    handleBannedUser(body: string): void;
}
