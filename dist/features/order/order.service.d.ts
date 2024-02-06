import { BucketVerificationResponseDto } from "./dto/bucket_verification_response.dto";
import { BucketVerificationRequestDto } from "./dto/bucket_verification_request.dto";
import { PaymentRequestDto } from "./dto/payment_request.dto";
import { PaymentResponseDto } from "./dto/payment_response.dto";
import { OrderRequestDto } from "./dto/order_request.dto";
import { OrderResponseDto } from "./dto/order_response.dto";
export declare class OrderService {
    private readonly network;
    bucketVerification(params: BucketVerificationRequestDto): Promise<BucketVerificationResponseDto>;
    private checkBucket;
    paymentGateway(params: PaymentRequestDto): Promise<PaymentResponseDto>;
    createOrder(params: OrderRequestDto): Promise<OrderResponseDto>;
    private createOrderNumber;
    private updateUserFavoriteFoods;
    private getUser;
    private getMenuItem;
    private getFavoriteFoodCount;
    getOrders(): Promise<any[]>;
    deleteOrder(params: OrderResponseDto): Promise<OrderResponseDto>;
}
