export declare class EventDto {
    eventId: string;
    eventName: string;
    eventTime: string;
    gameType?: string;
    award?: string;
    winner?: string;
    isStarted: boolean;
    isPysicalEvent: boolean;
    fromJson(json: any): void;
}
