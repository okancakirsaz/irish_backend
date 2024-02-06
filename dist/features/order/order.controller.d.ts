import { OrderService } from './order.service';
import { BucketVerificationRequestDto } from "./dto/bucket_verification_request.dto";
import { BucketVerificationResponseDto } from "./dto/bucket_verification_response.dto";
import { PaymentRequestDto } from "./dto/payment_request.dto";
import { OrderRequestDto } from "./dto/order_request.dto";
import { OrderResponseDto } from "./dto/order_response.dto";
import { SocketGateway } from "src/core/web_socket_gateway";
export declare class OrderController {
    private readonly service;
    private readonly webSocket;
    constructor(service: OrderService, webSocket: SocketGateway);
    bucketVerification(params: BucketVerificationRequestDto): Promise<BucketVerificationResponseDto>;
    payment(params: PaymentRequestDto): Promise<import("./dto/payment_response.dto").PaymentResponseDto>;
    createOrder(params: OrderRequestDto): Promise<OrderResponseDto>;
    getOrders(): Promise<any[]>;
    submitOrder(): Promise<void>;
    deleteOrder(params: OrderResponseDto): Promise<OrderResponseDto>;
}
