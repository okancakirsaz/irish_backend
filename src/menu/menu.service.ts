import { Injectable } from "@nestjs/common";
import { MenuItemDto } from "./dto/menu_item.dto";
import { FirebaseInit } from "src/core/firebase_init";
import { FirebaseColumns } from "src/core/enums/firebase_column_enums";

@Injectable()
export class MenuService{
    private network = FirebaseInit.instance;
    async getMenu():Promise<MenuItemDto[]>{
        const response = await this.network.getDocs(FirebaseColumns.MENU);
        let responseAsModel:MenuItemDto[]=[];
        response.forEach((element)=>{
            let elementAsModel:MenuItemDto = new MenuItemDto();
            elementAsModel.fromJson(element);
            responseAsModel.push(element);
        })
        return responseAsModel;
    }
}