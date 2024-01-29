import { BucketVerificationResponseDto } from "./dto/bucket_verification_response.dto";
import { BucketVerificationRequestDto } from "./dto/bucket_verification_request.dto";
export declare class OrderService {
    private readonly network;
    bucketVerification(params: BucketVerificationRequestDto): Promise<BucketVerificationResponseDto>;
    private checkBucket;
}
