import { GamesService } from "./games.service";
export declare class GamesController {
    private readonly service;
    constructor(service: GamesService);
    getEvents(): Promise<import("./dto/event.dto").EventDto[]>;
}
