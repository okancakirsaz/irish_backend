import { MenuService } from "./menu.service";
import { MenuItemDto } from "./dto/menu_item.dto";
export declare class MenuController {
    private readonly service;
    constructor(service: MenuService);
    getMenu(): Promise<MenuItemDto[]>;
}