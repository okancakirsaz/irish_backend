import { Body, Controller, Get, Post } from "@nestjs/common";
import { OrderService } from './order.service';
import { BucketVerificationRequestDto } from "./dto/bucket_verification_request.dto";
import { BucketVerificationResponseDto } from "./dto/bucket_verification_response.dto";
import { PaymentRequestDto } from "./dto/payment_request.dto";
import { OrderRequestDto } from "./dto/order_request.dto";

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

  @Post('payment')
  async payment(@Body() params:PaymentRequestDto){
    try {
      return await this.service.paymentGateway(params);
    } catch (error) {
      throw Error(error);
    }
  }

  @Post('create-order')
  async createOrder(@Body() params:OrderRequestDto){
    try {
      return await this.service.createOrder(params);
    } catch (error) {
      throw Error(error);
    }
  }

  @Get('orders')
  async getOrders(){
    try {
      return await this.service.getOrders();
    } catch (error) {
      throw Error(error);
    }
  }

  @Post('submit-order')
  async submitOrder(){
    try {
      //TODO: Contuniue here
    } catch (error) {
      throw Error(error);
    }
  }
}