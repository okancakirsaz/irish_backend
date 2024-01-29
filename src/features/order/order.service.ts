import { Injectable } from "@nestjs/common";
import { BucketVerificationResponseDto } from "./dto/bucket_verification_response.dto";
import { BucketVerificationRequestDto } from "./dto/bucket_verification_request.dto";
import { FirebaseServices } from "src/core/firebase_services";
import { FirebaseColumns } from "src/core/enums/firebase_column_enums";

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
        console.log(`For içi: ${isValid}`)
      }
    }
   
    console.log(isValid)
    return isValid;
  }
}
