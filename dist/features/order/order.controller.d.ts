import { OrderService } from './order.service';
import { BucketVerificationRequestDto } from "./dto/bucket_verification_request.dto";
import { BucketVerificationResponseDto } from "./dto/bucket_verification_response.dto";
export declare class OrderController {
    private readonly service;
    constructor(service: OrderService);
    bucketVerification(params: BucketVerificationRequestDto): Promise<BucketVerificationResponseDto>;
}
