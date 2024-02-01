export declare class FavoriteFoodDto {
    foodName: string;
    count: number;
    photo: string;
    fromJson(json: any): void;
    toJson(): Record<string, any>;
}
