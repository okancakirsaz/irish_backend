import { EventDto } from "./dto/event.dto";
export declare class GamesService {
    private readonly network;
    getActiveEvents(): Promise<EventDto[]>;
}
