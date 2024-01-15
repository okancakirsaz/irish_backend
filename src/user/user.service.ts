import { Injectable } from "@nestjs/common";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { UserDataDto } from "src/auth/dto/user_data.dto";
import { PostDto } from "src/community/dto/post.dto";
import { FirebaseColumns } from "src/core/enums/firebase_column_enums";
import { FirebaseServices } from "src/core/firebase_services";
import { IUserDataTypes } from "./core/user_data_types";

@Injectable()
export class UserService{
    private readonly network = FirebaseServices.instance;
    async getUserDatasFromToken(token:string,dataType:IUserDataTypes):Promise<PostDto[]>{
       const col = collection(this.network.firestore,FirebaseColumns.USERS);
       const q= query(col,where('token','==',token));
       const docs = await getDocs(q);
       let response = [];
       docs.forEach((doc)=>{ 
        response=doc.data()[dataType.dataType];
       });
       return response;
    }
}