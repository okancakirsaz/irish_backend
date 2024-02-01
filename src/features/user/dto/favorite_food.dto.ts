export class FavoriteFoodDto{
    foodName:string
    count:number
    photo:string

    fromJson(json:any){
    this.foodName=json['foodName'];
    this.count = json['count'];
    this.photo['photo'];
    }

    toJson():Record<string,any>{
        return {
            "foodName":this.foodName,
            "count":this.count,
            "photo":this.photo
        }
    }
}