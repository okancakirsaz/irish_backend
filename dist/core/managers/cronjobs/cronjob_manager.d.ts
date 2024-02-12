import { SocketGateway } from "src/core/web_socket_gateway";
export declare class CronjobManager {
    private readonly socket;
    constructor(socket: SocketGateway);
    private readonly network;
    syncActiveCustomers(): Promise<void>;
    private checkAndDeleteCustomersInDb;
}
