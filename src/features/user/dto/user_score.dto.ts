
export class UserScoreDto {
  userName: string;
  userId: string;
  challengedUserName: string;
  isWinned: boolean;
  game: string;


  fromJsonWithReturn(json:any):UserScoreDto{
    const data:UserScoreDto = new UserScoreDto();
    data.userId = json['userId'];
    data.userName = json['userName'];
    data.challengedUserName = json['challengedUserName'];
    data.game = json['game'];
    data.isWinned = json['isWinned'];
    return data;
  }
}
