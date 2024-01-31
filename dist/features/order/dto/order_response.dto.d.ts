export declare class OrderResponseDto {
    orderId: number;
    orderList: string[];
    totalPrice: number;
    timestamp: string;
    isOrderReady: boolean;
    toJson(): Record<string, any>;
}
