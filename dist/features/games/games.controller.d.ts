import { GamesService } from "./games.service";
import { EventDto } from "./dto/event.dto";
export declare class GamesController {
    private readonly service;
    constructor(service: GamesService);
    getEvents(): Promise<EventDto[]>;
    createEvent(params: EventDto): Promise<EventDto>;
    deleteEvent(params: EventDto): Promise<EventDto>;
}
