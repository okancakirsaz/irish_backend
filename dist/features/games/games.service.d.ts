import { EventDto } from "./dto/event.dto";
import { SocketGateway } from "src/core/web_socket_gateway";
import { GameRoomDto } from "./dto/game_room.dto";
import { DuelInviteDto } from "./dto/duel_invite.dto";
import { GamesGateway } from "./games_gateway";
export declare class GamesService {
    private readonly socket;
    private readonly gameSocket;
    constructor(socket: SocketGateway, gameSocket: GamesGateway);
    private readonly network;
    getActiveEvents(): Promise<EventDto[]>;
    createEvent(params: EventDto): Promise<EventDto>;
    deleteEvent(params: EventDto): Promise<EventDto>;
    startEvent(params: EventDto): Promise<EventDto>;
    setGameRoom(params: GameRoomDto): Promise<GameRoomDto>;
    private setIsGameRoomDone;
    getGameRoom(params: DuelInviteDto): Promise<GameRoomDto>;
}
