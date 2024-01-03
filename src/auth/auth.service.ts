import { Injectable } from "@nestjs/common";
import { UserDataDto } from "./user_data.dto";
import { FirebaseInit } from "src/core/firebase_init";
import { createUserWithEmailAndPassword } from "@firebase/auth";

@Injectable()
export class AuthService{
   async signUp(userData:UserDataDto):Promise<any> {
    await createUserWithEmailAndPassword(FirebaseInit.instance.auth,userData.email,userData.password);
    //TODO: Make database progress
    userData.token= await FirebaseInit.instance.auth.currentUser.getIdToken();
    return userData;
   }
}