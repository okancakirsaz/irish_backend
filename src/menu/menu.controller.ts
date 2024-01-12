import { Controller, Get, Headers, UnauthorizedException } from "@nestjs/common";
import { MenuService } from "./menu.service";
import { MenuItemDto } from "./dto/menu_item.dto";
import { FirebaseServices } from "src/core/firebase_services";

@Controller("menu")
export class MenuController{
    constructor(private readonly service:MenuService){}


@Get("get-menu")
async getMenu():Promise<MenuItemDto[]>{
   try {
        return await this.service.getMenu();
   } catch (error) {
    throw Error(error);
   }
}
}