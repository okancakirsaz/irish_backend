export class CurrentlyInIrishDto {
  name: string;
  gender: string;
  isAnonym: boolean;
  token: string;
  uid:string;
  timestamp:string;
  profileImage?: string;

  toJson():Record<string,any>{
    return {
        "name":this.name,
        "gender":this.gender,
        "isAnonym":this.isAnonym,
        "token":this.token,
        "timestamp":this.timestamp,
        "uid":this.uid,
        "profileImage":this.profileImage
    }
  }

  fromJsonWithReturn(json):CurrentlyInIrishDto{
    const data:CurrentlyInIrishDto = new CurrentlyInIrishDto();
    data.gender=json["gender"];
    data.isAnonym=json["isAnonym"];
    data.name = json["name"];
    data.timestamp = json['timestamp'];
    data.profileImage = json["profileImage"];
    data.token = json["token"];
    data.uid = json["uid"];
    return data;
  }
}
