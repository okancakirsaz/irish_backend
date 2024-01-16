import { Injectable } from "@nestjs/common";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { UserDataDto } from "src/auth/dto/user_data.dto";
import { PostDto } from "src/community/dto/post.dto";
import { FirebaseColumns } from "src/core/enums/firebase_column_enums";
import { FirebaseServices } from "src/core/firebase_services";
import { IUserDataTypes } from "./core/user_data_types";
import { UserSettingsDto } from "./dto/user_settings.dto";
import { ChangeProfilePhotoDto } from "./dto/change_profile_photo.dto";
import { UidReqDto } from "./dto/uid_req.dto";
import { BooleanSingleResponseDto } from "./dto/boolean_single_response.dto";
import {
  UserCredential,
  deleteUser,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from "@firebase/auth";
import { PostDeleteReqDto } from "./dto/post_delete_req.dto";

@Injectable()
export class UserService {
  private readonly network = FirebaseServices.instance;
  async getUserDatasFromToken(
    token: string,
    dataType: IUserDataTypes
  ): Promise<PostDto[]> {
    const col = collection(this.network.firestore, FirebaseColumns.USERS);
    const q = query(col, where("token", "==", token));
    const docs = await getDocs(q);
    let response = [];
    docs.forEach((doc) => {
      response = doc.data()[dataType.dataType];
    });
    return response;
  }

  async getUserSettings(token: string): Promise<UserSettingsDto> {
    const userData = await this.getUserData(token);
    return this.fetchUserSettings(userData);
  }

  async setNewUserSettings(
    params: UserSettingsDto,
    token: string
  ): Promise<UserSettingsDto> {
    let newSettings: UserSettingsDto = new UserSettingsDto();
    let userData: UserDataDto = await this.getUserData(token);
    const newUserData: UserDataDto = await this.updateUserData(
      userData,
      params
    );
    newSettings.email = newUserData.email;
    newSettings.isAnonym = newUserData.isAnonym;
    newSettings.name = newUserData.name;
    newSettings.phoneNumber = newUserData.phoneNumber;
    newSettings.photoUrl = newUserData.profileImage;
    return newSettings;
  }

  async changeProfilePhoto(
    params: ChangeProfilePhotoDto
  ): Promise<ChangeProfilePhotoDto> {
    const imageRef: string = await this.network.setImageToStorage(
      params.imageAsByte,
      params.uid,
      "profilePhotos"
    );
    params.profileImage = imageRef;
    await this.setProfileImageToDb(params.uid, params.profileImage);
    return params;
  }

  async deleteProfileImage(
    params: UidReqDto
  ): Promise<BooleanSingleResponseDto> {
    let response: BooleanSingleResponseDto = new BooleanSingleResponseDto();
    try {
      await this.setProfileImageToDb(params.uid, null);
      response.isSuccess = true;
      return response;
    } catch (_) {
      response.isSuccess = false;
      return response;
    }
  }
  async deleteAccount(params: UidReqDto): Promise<BooleanSingleResponseDto> {
    let response: BooleanSingleResponseDto = new BooleanSingleResponseDto();
    try {
      await this.deleteUserFromAuthService(params.uid);
      await this.deleteUserPosts(params.uid);
      await this.network.deleteDoc(FirebaseColumns.USERS, params.uid);
      await this.deleteUserProfileImageFromStorage(params.uid);
      response.isSuccess = true;
      return response;
    } catch (_) {
      console.log(_);
      response.isSuccess = false;
      return response;
    }
  }

  async deletePost(params:PostDeleteReqDto):Promise<BooleanSingleResponseDto>{
    let response:BooleanSingleResponseDto = new BooleanSingleResponseDto();
    try {
        await this.network.deleteDoc(FirebaseColumns.POSTS,params.postId);
        const userData:UserDataDto = await this.getUserData(params.token);
        await this.network.deleteImageFromStorage(params.postId,'posts');
        userData.posts.forEach((post)=>{
            if(post.id==params.postId){
                const index:number = userData.posts.indexOf(post);
                userData.posts.splice(index,1);
            }
        });
        await this.network.updateDocument(FirebaseColumns.USERS,userData.uid,userData.toJson());
        response.isSuccess=true;
    } catch (error) {
        console.log(error);
        response.isSuccess=false;
    }
    finally{
        return response;
    }
  }

  private async getUserData(token: string): Promise<UserDataDto> {
    const col = collection(this.network.firestore, FirebaseColumns.USERS);
    const q = query(col, where("token", "==", token));
    const docs = await getDocs(q);
    const dto: UserDataDto = new UserDataDto();
    docs.forEach((doc) => {
      dto.fromJson(doc.data());
    });
    return dto;
  }

  private fetchUserSettings(userData: UserDataDto): UserSettingsDto {
    let settings: UserSettingsDto = new UserSettingsDto();
    settings.email = userData.email;
    settings.isAnonym = userData.isAnonym;
    settings.name = userData.name;
    settings.phoneNumber = userData.phoneNumber;
    settings.photoUrl = userData.profileImage;
    return settings;
  }

  private async updateUserData(
    userData: UserDataDto,
    params: UserSettingsDto
  ): Promise<UserDataDto> {
    userData.isAnonym = params.isAnonym;
    userData.name = params.name;
    userData.email = params.email;
    userData.phoneNumber = params.phoneNumber;
    await this.network.updateDocument(FirebaseColumns.USERS,userData.uid,userData.toJson());
    return userData;
  }

  private async setProfileImageToDb(uid: string, profileImage?: string) {
    await this.network.updateDocument(FirebaseColumns.USERS,uid,{ profileImage: profileImage });
  }

  private async deleteUserProfileImageFromStorage(uid: string) {
    try {
      await this.network.deleteImageFromStorage(uid, "profilePhotos");
    } catch (error) {
      //Photo is not exist
    }
  }

  private async deleteUserPosts(uid: string) {
    const currentUser = await this.getUserForDelete(uid);
    const postsCol = await collection(
      this.network.firestore,
      FirebaseColumns.POSTS
    );
    currentUser.posts.forEach(async (data) => {
      const findPosts = query(postsCol, where("id", "==", data.id));
      const foundPosts = await getDocs(findPosts);
      foundPosts.forEach(async (post) => {
        await deleteDoc(doc(postsCol, post.data()["id"]));
        await this.network.deleteImageFromStorage(post.data()["id"], "posts");
      });
    });
  }

  private async getUserForDelete(uid: string): Promise<UserDataDto> {
    const user = await this.network.getDoc(FirebaseColumns.USERS, uid);
    const userAsDto: UserDataDto = new UserDataDto();
    userAsDto.fromJson(user.data());
    return userAsDto;
  }

  private async deleteUserFromAuthService(uid: string) {
    const userData = await this.network.getDoc(FirebaseColumns.USERS, uid);
    const user: UserCredential = await signInWithEmailAndPassword(
      this.network.auth,
      userData.data()["email"],
      userData.data()["password"]
    );
    await deleteUser(user.user);
  }
}
