export declare class UserScoreDto {
    userName: string;
    userId: string;
    challengedUserName: string;
    isWinned: boolean;
    game: string;
    fromJsonWithReturn(json: any): UserScoreDto;
}
