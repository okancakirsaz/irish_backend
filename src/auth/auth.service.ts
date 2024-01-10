import { Injectable } from "@nestjs/common";
import { UserDataDto } from "./dto/user_data.dto";
import { FirebaseInit } from "src/core/firebase_init";
import {FirebaseColumns} from "src/core/enums/firebase_column_enums";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "@firebase/auth";
import { LogInRequestDto } from "./dto/log_in_request.dto";
import { LogInErrorDto } from "./dto/log_in_error.dto";
import { ForgotPasswordRequestDto } from "./dto/forgot_password_request.dto";
import { ForgotPasswordResponseDto } from "./dto/forgot_password_response.dto";
@Injectable()
export class AuthService {
  async signUp(userData: UserDataDto): Promise<UserDataDto> {
      await createUserWithEmailAndPassword(
         FirebaseInit.instance.auth,
         userData.email,
         userData.password
       );
       userData.uid=FirebaseInit.instance.auth.currentUser.uid;
       userData.token=await FirebaseInit.instance.auth.currentUser.getIdToken();
       userData.password=null;
       await FirebaseInit.instance.setData(userData,FirebaseColumns.USERS,FirebaseInit.instance.auth.currentUser.uid);
       await signOut(FirebaseInit.instance.auth);
       return userData;
  }

  async logIn(params:LogInRequestDto):Promise<UserDataDto|LogInErrorDto>{
    try{
      let user:UserDataDto=new UserDataDto();
      await signInWithEmailAndPassword(FirebaseInit.instance.auth,params.email,params.password);
      const userData=(await FirebaseInit.instance.getDoc(FirebaseColumns.USERS,FirebaseInit.instance.auth.currentUser.uid)).data();
      user.fromJson(userData);
      await signOut(FirebaseInit.instance.auth);
      return user;
    }
    catch(_){
      let errorDto:LogInErrorDto= new LogInErrorDto();
      errorDto.reason="Geçersiz e-posta veya şifre."
      return errorDto;
    }
  }

  async forgotPassword(params:ForgotPasswordRequestDto):Promise<ForgotPasswordResponseDto>{
    const response:ForgotPasswordResponseDto = new ForgotPasswordResponseDto();
      response.email=params.email;
     
    try {
     await sendPasswordResetEmail(FirebaseInit.instance.auth,params.email);
     response.isMailSended=true;
     response.reason=null;
    } catch (_) {
      response.isMailSended=false;
      response.reason="Geçersiz e-posta adresi";
    }
    return response;
  }
}