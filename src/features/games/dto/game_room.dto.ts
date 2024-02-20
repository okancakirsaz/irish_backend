export class GameRoomDto{
    challengerUserId:string
    challengerUserName:string
    challengerUserScore?:number
    challengedUserId:string
    challengedUserName:string
    challengedUserScore?:number
    gameId:string

    fromJsonWithReturn(json:any):GameRoomDto{
        const data:GameRoomDto = new GameRoomDto();
        data.challengedUserId=json['challengedUserId'];
        data.challengedUserName=json['challengedUserName'];
        data.challengedUserScore=json['challengedUserScore'];
        data.challengerUserId=json['challengerUserId'];
        data.challengerUserName=json['challengerUserName'];
        data.challengerUserScore=json['challengerUserScore'];
        data.gameId=json['gameId'];
        return data;
    }
}