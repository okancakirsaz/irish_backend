import { BucketVerificationResponseDto } from "./dto/bucket_verification_response.dto";
import { BucketVerificationRequestDto } from "./dto/bucket_verification_request.dto";
import { PaymentRequestDto } from "./dto/payment_request.dto";
import { PaymentResponseDto } from "./dto/payment_response.dto";
import { OrderRequestDto } from "./dto/order_request.dto";
import { OrderResponseDto } from "./dto/order_response.dto";
import { SocketGateway } from "src/core/web_socket_gateway";
export declare class OrderService {
    private readonly socket;
    private readonly network;
    constructor(socket: SocketGateway);
    bucketVerification(params: BucketVerificationRequestDto): Promise<BucketVerificationResponseDto>;
    private checkBucket;
    paymentGateway(params: PaymentRequestDto): Promise<PaymentResponseDto>;
    createOrder(params: OrderRequestDto): Promise<OrderResponseDto>;
    private createOrderNumber;
    private updateUserFavoriteFoods;
    private fetchNewFavFoodObject;
    private mergeFavoriteFoods;
    private getUser;
    private getMenuItem;
    private getFavoriteFoodCount;
    getOrders(): Promise<any[]>;
    deleteOrder(params: OrderResponseDto): Promise<OrderResponseDto>;
    submitOrder(params: OrderResponseDto): Promise<OrderResponseDto>;
    private updateActiveCustomersList;
}
