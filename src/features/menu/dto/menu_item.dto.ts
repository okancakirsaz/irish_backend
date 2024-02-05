export class MenuItemDto{
    name:string
    price:string
    image:string
    materials:string[]

    fromJson(json){
        this.name=json['name']
        this.price=json['price']
        this.image=json['image']
        this.materials=json['materials']
    }

    toJson(){
        return {
            "name":this.name,
            "price":this.price,
            "image":this.image,
            "materials":this.materials
        }
    }
}