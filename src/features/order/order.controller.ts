import { Body, Controller, Post } from "@nestjs/common";
import { OrderService } from './order.service';
import { BucketVerificationRequestDto } from "./dto/bucket_verification_request.dto";
import { BucketVerificationResponseDto } from "./dto/bucket_verification_response.dto";

@Controller('order')
export class OrderController{
    constructor(private readonly service:OrderService){}

   @Post('verification')
  async bucketVerification(@Body() params:BucketVerificationRequestDto):Promise<BucketVerificationResponseDto>{
    try {
        return await this.service.bucketVerification(params);
    } catch (error) {
        throw Error(error);
    }
  }
}