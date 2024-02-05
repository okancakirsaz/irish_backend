import { MenuItemDto } from "./dto/menu_item.dto";
export declare class MenuService {
    private network;
    getMenu(): Promise<MenuItemDto[]>;
    createMenuElement(params: MenuItemDto): Promise<MenuItemDto>;
    updateMenuElement(params: MenuItemDto): Promise<MenuItemDto>;
    deleteMenuElement(params: MenuItemDto): Promise<MenuItemDto>;
}
