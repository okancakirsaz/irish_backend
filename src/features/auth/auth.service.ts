import { Injectable } from "@nestjs/common";
import { UserDataDto } from "./dto/user_data.dto";
import { FirebaseServices } from "src/core/firebase_services";
import { FirebaseColumns } from "src/core/enums/firebase_column_enums";
import {
  User,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { LogInRequestDto } from "./dto/log_in_request.dto";
import { ForgotPasswordRequestDto } from "./dto/forgot_password_request.dto";
import { ForgotPasswordResponseDto } from "./dto/forgot_password_response.dto";
@Injectable()
export class AuthService {
  async signUp(userData: UserDataDto): Promise<UserDataDto> {
    const createdUser: User = await this.createUser(
      userData.email,
      userData.password
    );
    const newUser:UserDataDto = await this.saveUserToDb(userData,createdUser);
    await signOut(FirebaseServices.instance.auth);
    return newUser;
  }

  private async createUser(email: string, password: string): Promise<User> {
    try {
      await createUserWithEmailAndPassword(
        FirebaseServices.instance.auth,
        email,
        password
      );
      return FirebaseServices.instance.auth.currentUser;
    } catch (error) {
      console.log(error);
    }
  }

  private async saveUserToDb(
    userData: UserDataDto,
    createdUser: User
  ): Promise<UserDataDto> {
    userData.password = null;
    userData.uid = createdUser.uid;
    userData.token = await createdUser.getIdToken();
    await FirebaseServices.instance.setData(
      userData,
      FirebaseColumns.USERS,
      FirebaseServices.instance.auth.currentUser.uid
    );
    return userData;
  }

  //TODO:SOLID!
  async logIn(params: LogInRequestDto): Promise<UserDataDto> {
    try {
      let user: UserDataDto = new UserDataDto();
      await signInWithEmailAndPassword(
        FirebaseServices.instance.auth,
        params.email,
        params.password
      );
      const userData = (
        await FirebaseServices.instance.getDoc(
          FirebaseColumns.USERS,
          FirebaseServices.instance.auth.currentUser.uid
        )
      ).data();
      user.fromJson(userData);
      await signOut(FirebaseServices.instance.auth);
      return user;
    } catch (_) {
      return null;
    }
  }

  async forgotPassword(
    params: ForgotPasswordRequestDto
  ): Promise<ForgotPasswordResponseDto> {
    const response: ForgotPasswordResponseDto = new ForgotPasswordResponseDto();
    response.email = params.email;

    try {
      await sendPasswordResetEmail(
        FirebaseServices.instance.auth,
        params.email
      ); 
      response.isMailSended = true;
      response.reason = null;
    } catch (_) {
      response.isMailSended = false;
      response.reason = "Geçersiz e-posta adresi";
    }
    return response;
  }
}
