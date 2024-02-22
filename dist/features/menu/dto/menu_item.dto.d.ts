export declare class MenuItemDto {
    name: string;
    price: string;
    image: string;
    materials: string[];
    fromJson(json: any): void;
    fromJsonWithReturn(json: any): MenuItemDto;
    toJson(): {
        name: string;
        price: string;
        image: string;
        materials: string[];
    };
}
