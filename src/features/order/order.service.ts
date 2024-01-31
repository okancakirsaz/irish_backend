import { Injectable } from "@nestjs/common";
import { BucketVerificationResponseDto } from "./dto/bucket_verification_response.dto";
import { BucketVerificationRequestDto } from "./dto/bucket_verification_request.dto";
import { FirebaseServices } from "src/core/firebase_services";
import { FirebaseColumns } from "src/core/enums/firebase_column_enums";
import { PaymentRequestDto } from "./dto/payment_request.dto";
import { PaymentResponseDto } from "./dto/payment_response.dto";
import { OrderRequestDto } from "./dto/order_request.dto";
import { OrderResponseDto } from "./dto/order_response.dto";

@Injectable()
export class OrderService {
    private readonly network:FirebaseServices = FirebaseServices.instance;

  async bucketVerification(
    params: BucketVerificationRequestDto
  ): Promise<BucketVerificationResponseDto> {
    const response: BucketVerificationResponseDto =
      new BucketVerificationResponseDto();
    const isBucketValid:boolean = await this.checkBucket(params.idList);
    if(isBucketValid){
        response.isAllValid=true;
    }
    else{
        response.errorMessage = "Menüde artık bulunmayan bir şey sipariş ettiniz.";
        response.isAllValid=false;
    }
    return response;
  }

  private async checkBucket(idList: string[]): Promise<boolean> {
    let isValid:boolean = true;
    
    for(let i =0;i<=idList.length-1;i++){
        const doc = await this.network.getDoc(FirebaseColumns.MENU,idList[i]);
      if(doc.data()==null){
        isValid=false;
      }
    }   
    return isValid;
  }

  async paymentGateway(params:PaymentRequestDto):Promise<PaymentResponseDto>{
    //TODO: Make real payment gateway
    const response:PaymentResponseDto = new PaymentResponseDto();
    response.isSuccess=true;
    response.errorMessage=null;
    return response;
  }


  async createOrder(params:OrderRequestDto):Promise<OrderResponseDto>{
    const response:OrderResponseDto = new OrderResponseDto();
    response.orderList=params.orderList;
    response.totalPrice=params.totalPrice;
    response.timestamp=params.timestamp;
    response.isOrderReady=false;
    response.orderId=await this.createOrderNumber();

    await this.network.setData(response.toJson(),FirebaseColumns.ORDERS,`${response.orderId}`)
    return response;
  }

  private async createOrderNumber():Promise<number>{
   const lastOrderData =  (await this.network.getDoc(FirebaseColumns.SYSTEM_LOGS,"order-log")).data();
   const dateObject:Date = new Date();
   let newOrderData:Record<string,any> = {
    day:lastOrderData['day'],
    month:lastOrderData['month'],
    year:lastOrderData['year'],
    lastOrderCount:lastOrderData['lastOrderCount']
   }
   if(newOrderData['day']!=dateObject.getDate()||newOrderData['month']!=dateObject.getMonth()+1){
    newOrderData['lastOrderCount']=1;
    newOrderData['day']=dateObject.getDate();
    newOrderData['month']=dateObject.getMonth()+1;
    newOrderData['year']=dateObject.getFullYear();
   }
   else{
    newOrderData['lastOrderCount']+=1;
   }
   await this.network.updateDocument(FirebaseColumns.SYSTEM_LOGS,"order-log",newOrderData);
   return newOrderData['lastOrderCount'];
  }
}
