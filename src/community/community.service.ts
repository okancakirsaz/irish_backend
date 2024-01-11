import { Injectable } from "@nestjs/common";
import { PostDto } from "./dto/post.dto";
import {Buffer} from 'buffer';
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { FirebaseInit } from "src/core/firebase_init";
import { FirebaseColumns } from "src/core/enums/firebase_column_enums";
import { collection, doc, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore";
import { UserDataDto } from "src/auth/dto/user_data.dto";
import { GetMorePostDto } from "./dto/get_more_posts_req.dto";

@Injectable()
export class CommunityService {

  private network:FirebaseInit = FirebaseInit.instance;

  async sharePost(params:PostDto){
      params.apiImage =await this.savePostImageToStorage(params.imageAsByte,params.id);
      params.imageAsByte=null;
      await this.network.setData(params,FirebaseColumns.POSTS,params.id);
      await this.savePostToUserData(params);
      return params
  }

  private async savePostToUserData(params:PostDto){
    const usersCol = await collection(this.network.firestore,FirebaseColumns.USERS);
    const findSharedUser = query(usersCol, where('uid','==',params.user.uid))
    const foundUser = await getDocs(findSharedUser);
    foundUser.forEach((user)=>{
      const userData:UserDataDto = new UserDataDto();
      userData.fromJson(user.data());
      userData.posts.push(params);
      updateDoc(doc(usersCol,user.id),userData.toJson());
  })
  }

  private async savePostImageToStorage(imageAsBase64:string,refId:string):Promise<string>{
    const decodedData = Buffer.from(imageAsBase64, 'base64').toString('binary');
    const imageDataAsUint8List = Buffer.from(decodedData,'binary');
    const storageRef = ref(
        this.network.storage,
        "posts/" + `${refId}.jpg`
      );
      await uploadBytesResumable(storageRef, imageDataAsUint8List);
      return await getDownloadURL(storageRef);
  }

  async getCurrentPosts():Promise<PostDto[]>{

    const q = query(
      collection(this.network.firestore, FirebaseColumns.POSTS),
      orderBy("timestamp", "desc"),
      limit(2)
    );
    let response:PostDto[]=[];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) =>{
      const docAsElement:PostDto = new PostDto();
      docAsElement.fromJson(doc.data());
      response.push(docAsElement); 
    });
    return response;
  }

  async getMoreCommunityShares(params:GetMorePostDto):Promise<PostDto[]>{
    const timestampQuery = query(
      collection(this.network.firestore, FirebaseColumns.POSTS),
      orderBy("timestamp", "desc"),
    );
    const q = query(timestampQuery,where('timestamp','<',params.time),limit(2))
    let response:PostDto[]=[];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) =>{
      const docAsElement:PostDto = new PostDto();
      docAsElement.fromJson(doc.data());
      response.push(docAsElement); 
    });
    return response;
  }
}