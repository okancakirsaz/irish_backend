export declare class GameRoomDto {
    challengerUserId: string;
    challengerUserName: string;
    challengerUserScore?: number;
    challengedUserId: string;
    challengedUserName: string;
    challengedUserScore?: number;
    gameId: string;
    fromJsonWithReturn(json: any): GameRoomDto;
}
