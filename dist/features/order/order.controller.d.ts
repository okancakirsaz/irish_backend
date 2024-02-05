import { OrderService } from './order.service';
import { BucketVerificationRequestDto } from "./dto/bucket_verification_request.dto";
import { BucketVerificationResponseDto } from "./dto/bucket_verification_response.dto";
import { PaymentRequestDto } from "./dto/payment_request.dto";
import { OrderRequestDto } from "./dto/order_request.dto";
export declare class OrderController {
    private readonly service;
    constructor(service: OrderService);
    bucketVerification(params: BucketVerificationRequestDto): Promise<BucketVerificationResponseDto>;
    payment(params: PaymentRequestDto): Promise<import("./dto/payment_response.dto").PaymentResponseDto>;
    createOrder(params: OrderRequestDto): Promise<import("./dto/order_response.dto").OrderResponseDto>;
    getOrders(): Promise<any[]>;
    submitOrder(): Promise<void>;
}
