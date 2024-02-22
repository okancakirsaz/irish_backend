import { Body, Controller, Get, Post } from "@nestjs/common";
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

@Post("get-menu-item")
async getMenuItem(@Body() params:any):Promise<MenuItemDto>{
    try {
        return await this.service.getMenuItem(params["itemName"]);
   } catch (error) {
    throw Error(error);
   }
}

@Post("create-element")
async createMenuElement(@Body() params:MenuItemDto):Promise<MenuItemDto>{
    try {
        return await this.service.createMenuElement(params);
   } catch (error) {
    throw Error(error);
   }
}
@Post("delete-element")
async deleteMenuElement(@Body() params:MenuItemDto):Promise<MenuItemDto>{
    try {
        return await this.service.deleteMenuElement(params);
   } catch (error) {
    throw Error(error);
   }
}

@Post("update-element")
async updateMenuElement(@Body() params:MenuItemDto):Promise<MenuItemDto>{
    try {
    return await this.service.updateMenuElement(params);
   } catch (error) {
    throw Error(error);
   }
}
}