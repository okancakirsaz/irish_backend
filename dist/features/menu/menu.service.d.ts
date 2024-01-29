import { MenuItemDto } from "./dto/menu_item.dto";
export declare class MenuService {
    private network;
    getMenu(): Promise<MenuItemDto[]>;
}
