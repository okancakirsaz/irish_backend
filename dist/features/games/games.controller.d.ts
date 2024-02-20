import { GamesService } from "./games.service";
import { EventDto } from "./dto/event.dto";
import { GameRoomDto } from "./dto/game_room.dto";
import { DuelInviteDto } from "./dto/duel_invite.dto";
export declare class GamesController {
    private readonly service;
    constructor(service: GamesService);
    getEvents(): Promise<EventDto[]>;
    createEvent(params: EventDto): Promise<EventDto>;
    deleteEvent(params: EventDto): Promise<EventDto>;
    startEvent(params: EventDto): Promise<EventDto>;
    createGameRoom(params: GameRoomDto): Promise<GameRoomDto>;
    setGameRoomChallenged(params: GameRoomDto): Promise<GameRoomDto>;
    setGameRoomChallenger(params: GameRoomDto): Promise<GameRoomDto>;
    getGameRoom(params: DuelInviteDto): Promise<GameRoomDto>;
}
