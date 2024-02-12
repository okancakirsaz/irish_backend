import { Injectable } from "@nestjs/common";
import { PostDto } from "./dto/post.dto";
import { FirebaseServices } from "src/core/firebase_services";
import { FirebaseColumns } from "src/core/enums/firebase_column_enums";
import { collection, doc, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore";
import { UserDataDto } from "src/features/auth/dto/user_data.dto";
import { GetMorePostDto } from "./dto/get_more_posts_req.dto";
import { LiteUserDto } from "./dto/lite_user.dto";
import { CurrentlyInIrishDto } from "./dto/currently_in_irish.dto";

@Injectable()
export class CommunityService {

  private network:FirebaseServices = FirebaseServices.instance;

  async sharePost(params:PostDto){
      params.apiImage =await this.network.setImageToStorage(params.imageAsByte,params.id,"posts");
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


  async getAllUsers():Promise<UserDataDto[]>{
   const users = await this.network.getDocs(FirebaseColumns.USERS);
   const userListAsModel:UserDataDto[] = [];
   for(let i=0;i<=users.length-1;i++){
   const dataAsModel:UserDataDto = new UserDataDto();
   dataAsModel.fromJson(users[i]);
   userListAsModel.push(dataAsModel);
   }
   return userListAsModel; 
  }

  async blockUser(params:UserDataDto):Promise<UserDataDto>{
    params.isUserBanned=true;
    await this.deleteUserPostsInCommunity(params.posts);
    await this.network.updateDocument(FirebaseColumns.USERS,params.uid,params);
    return params;
  }

  private async deleteUserPostsInCommunity(posts:PostDto[]){
    for(let i = 0; i<=posts.length-1;i++){
      await this.network.deleteDoc(FirebaseColumns.POSTS,posts[i].id);
    }
  }

  async unblockUser(params:UserDataDto):Promise<UserDataDto>{
    params.isUserBanned=false;
    await this.addUserPostsToCommunityAfterUnblock(params.posts);
    await this.network.updateDocument(FirebaseColumns.USERS,params.uid,params);
    return params;
  }

  private async addUserPostsToCommunityAfterUnblock(posts:PostDto[]){
    for(let i = 0; i<=posts.length-1;i++){
      await this.network.setData(posts[i],FirebaseColumns.POSTS,posts[i].id);
    }
  }

  async getCustomerList():Promise<CurrentlyInIrishDto[]>{
    const response:CurrentlyInIrishDto[] =[];
    const customers = await this.network.getDocs(FirebaseColumns.CUSTOMERS);
    for(const index in customers){
      response.push(new CurrentlyInIrishDto().fromJsonWithReturn(customers[index]));
    }
    return response;
  }
}