export declare class OrderResponseDto {
    orderId: number;
    orderList: string[];
    totalPrice: number;
    userId: string;
    timestamp: string;
    isOrderReady: boolean;
    duelWinner?: string;
    toJson(): Record<string, any>;
}
