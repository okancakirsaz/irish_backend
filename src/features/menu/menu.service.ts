import { Injectable } from "@nestjs/common";
import { MenuItemDto } from "./dto/menu_item.dto";
import { FirebaseServices } from "src/core/firebase_services";
import { FirebaseColumns } from "src/core/enums/firebase_column_enums";

@Injectable()
export class MenuService{
    private network = FirebaseServices.instance;
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


    async createMenuElement(params:MenuItemDto):Promise<MenuItemDto>{
        try {
            const imagePath:string =  await this.network.setImageToStorage(params.image,params.name,"menu");
            params.image = imagePath;
            await this.network.setData(params,FirebaseColumns.MENU,params.name);
            return params;
        } catch (error) {
            throw Error(error);
            //TODO: Make error log system
        }
    }

    async updateMenuElement(params:MenuItemDto):Promise<MenuItemDto>{
        try {
            const newElement:MenuItemDto = new MenuItemDto();
            let dataForSend:Record<string,any> = {};
            newElement.price=params.price;
            newElement.materials=params.materials;
            if(params.image!=""){
            const imagePath:string =  await this.network.setImageToStorage(params.image,params.name,"menu");
            newElement.image = imagePath;
            dataForSend = {
            "image":newElement.image,
            "price":newElement.price,
            "materials":newElement.materials
            }
            }
            else{
                dataForSend = {
                    "price":newElement.price,
                    "materials":newElement.materials
                    }
            }
            
            await this.network.updateDocument(FirebaseColumns.MENU,params.name,dataForSend);
            return newElement;
        } catch (error) {
            throw Error(error);
            //TODO: Make error log system
        }
    }

    async deleteMenuElement(params:MenuItemDto):Promise<MenuItemDto>{
        try {
            await this.network.deleteDoc(FirebaseColumns.MENU,params.name);
            await this.network.deleteImageFromStorage(params.name,"menu");
            return params;
        } catch (error) {
            throw Error(error);
            //TODO: Make error log system
        }
    }
}