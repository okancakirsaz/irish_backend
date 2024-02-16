import { EventDto } from "./dto/event.dto";
import { SocketGateway } from "src/core/web_socket_gateway";
export declare class GamesService {
    private readonly socket;
    constructor(socket: SocketGateway);
    private readonly network;
    getActiveEvents(): Promise<EventDto[]>;
    createEvent(params: EventDto): Promise<EventDto>;
    deleteEvent(params: EventDto): Promise<EventDto>;
    startEvent(params: EventDto): Promise<EventDto>;
}
