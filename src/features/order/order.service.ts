import { Injectable } from "@nestjs/common";
import { BucketVerificationResponseDto } from "./dto/bucket_verification_response.dto";
import { BucketVerificationRequestDto } from "./dto/bucket_verification_request.dto";
import { FirebaseServices } from "src/core/firebase_services";
import { FirebaseColumns } from "src/core/enums/firebase_column_enums";
import { PaymentRequestDto } from "./dto/payment_request.dto";
import { PaymentResponseDto } from "./dto/payment_response.dto";
import { OrderRequestDto } from "./dto/order_request.dto";
import { OrderResponseDto } from "./dto/order_response.dto";
import { UserDataDto } from "../auth/dto/user_data.dto";
import { MenuItemDto } from "../menu/dto/menu_item.dto";
import { FavoriteFoodDto } from "../user/dto/favorite_food.dto";
import { SocketGateway } from "src/core/web_socket_gateway";
import { CurrentlyInIrishDto } from "../community/dto/currently_in_irish.dto";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class OrderService {
  private readonly network: FirebaseServices = FirebaseServices.instance;
  constructor(private readonly socket:SocketGateway) {
    
  }

  async bucketVerification(
    params: BucketVerificationRequestDto
  ): Promise<BucketVerificationResponseDto> {
    const response: BucketVerificationResponseDto =
      new BucketVerificationResponseDto();
    const isBucketValid: boolean = await this.checkBucket(params.idList);
    if (isBucketValid) {
      response.isAllValid = true;
    } else {
      response.errorMessage =
        "Menüde artık bulunmayan bir şey sipariş ettiniz.";
      response.isAllValid = false;
    }
    return response;
  }

  private async checkBucket(idList: string[]): Promise<boolean> {
    let isValid: boolean = true;

    for (let i = 0; i <= idList.length - 1; i++) {
      const doc = await this.network.getDoc(FirebaseColumns.MENU, idList[i]);
      if (doc.data() == null) {
        isValid = false;
      }
    }
    return isValid;
  }

  async paymentGateway(params: PaymentRequestDto): Promise<PaymentResponseDto> {
    //TODO: Make real payment gateway
    const response: PaymentResponseDto = new PaymentResponseDto();
    response.isSuccess = true;
    response.errorMessage = null;
    return response;
  }

  async createOrder(params: OrderRequestDto): Promise<OrderResponseDto> {
    const response: OrderResponseDto = new OrderResponseDto();
    response.orderList = params.orderList;
    response.totalPrice = params.totalPrice;
    response.timestamp = params.timestamp;
    response.isOrderReady = false;
    response.userId = params.userId;
    response.orderId = await this.createOrderNumber();
    await this.network.setData(
      response.toJson(),
      FirebaseColumns.ORDERS,
      `${response.orderId}`
    );
    if(params.userId!="admin-panel"){
      await this.updateUserFavoriteFoods(params);
      await this.updateActiveCustomersList(params.userId);
    }
    this.socket.handleOrderReceivedCase(response);
    return response;
  }

  private async createOrderNumber(): Promise<number> {
    const lastOrderData = (
      await this.network.getDoc(FirebaseColumns.SYSTEM_LOGS, "order-log")
    ).data();
    const dateObject: Date = new Date();
    let newOrderData: Record<string, any> = {
      day: lastOrderData["day"],
      month: lastOrderData["month"],
      year: lastOrderData["year"],
      lastOrderCount: lastOrderData["lastOrderCount"],
    };
    if (
      newOrderData["day"] != dateObject.getDate() ||
      newOrderData["month"] != dateObject.getMonth() + 1
    ) {
      newOrderData["lastOrderCount"] = 1;
      newOrderData["day"] = dateObject.getDate();
      newOrderData["month"] = dateObject.getMonth() + 1;
      newOrderData["year"] = dateObject.getFullYear();
    } else {
      newOrderData["lastOrderCount"] += 1;
    }
    await this.network.updateDocument(
      FirebaseColumns.SYSTEM_LOGS,
      "order-log",
      newOrderData
    );
    return newOrderData["lastOrderCount"];
  }

  private async updateUserFavoriteFoods(params: OrderRequestDto) {
    const user: UserDataDto = await this.getUser(params.userId);
    const foodList: any[] = [];
    for (let i = 0; i <= params.orderList.length - 1; i++) {
      const favoriteFoodData:FavoriteFoodDto = await this.fetchNewFavFoodObject(params.orderList[i]["name"],user);

      foodList.push(favoriteFoodData.toJson());
    }

    await this.network.updateDocument(FirebaseColumns.USERS, params.userId, {
      favoriteFoods: this.mergeFavoriteFoods(user.favoriteFoods,foodList),
    });
  }

  private async fetchNewFavFoodObject(orderName:string,user:UserDataDto):Promise<FavoriteFoodDto>{

    const favoriteFoodData: FavoriteFoodDto = new FavoriteFoodDto();
    const menuItem: MenuItemDto = await this.getMenuItem(
      orderName
    );
    (favoriteFoodData.photo = menuItem.image),
      (favoriteFoodData.count = this.getFavoriteFoodCount(
        menuItem.name,
        user
      ));
    favoriteFoodData.foodName = menuItem.name;
    return favoriteFoodData;
  }

  private mergeFavoriteFoods(userFavoriteFoods: any[], foodList: any[]): any[] {
    const mergedList: any[] = [];

    userFavoriteFoods.forEach((favoriteFood: any) => {
        if (!foodList.some(food => food.foodName === favoriteFood.foodName)) {
            mergedList.push(favoriteFood);
        }
    });

    mergedList.push(...foodList);

    return mergedList;

  }


  private async getUser(userId: string): Promise<UserDataDto> {
    const userData = (
      await this.network.getDoc(FirebaseColumns.USERS, userId)
    ).data();
    const userDataAsModel: UserDataDto = new UserDataDto();
    userDataAsModel.fromJson(userData);
    return userDataAsModel;
  }
  private async getMenuItem(itemName: string): Promise<MenuItemDto> {
    const menuData = (
      await this.network.getDoc(FirebaseColumns.MENU, itemName)
    ).data();
    const menuDataAsModel: MenuItemDto = new MenuItemDto();
    menuDataAsModel.fromJson(menuData);
    return menuDataAsModel;
  }

  private getFavoriteFoodCount(
    foodName: string,
    userData: UserDataDto
  ): number {
    let count: number = 1;
    for (let i = 0; i <= userData.favoriteFoods.length - 1; i++) {
      if (foodName == userData.favoriteFoods[i].foodName) {
        count = userData.favoriteFoods[i].count + 1;
      }
    }
    return count;
  }

  async getOrders() {
    return await this.network.getDocs(FirebaseColumns.ORDERS);
  }

  async deleteOrder(params: OrderResponseDto) {
    await this.network.deleteDoc(FirebaseColumns.ORDERS, `${params.orderId}`);
    return params;
  }

  async submitOrder(params: OrderResponseDto) {
    params.isOrderReady=true;
    await this.network.setData(params,FirebaseColumns.ORDERS,`${params.orderId}`);
    return params;
  }

  private async updateActiveCustomersList(userId:string){
    const user: UserDataDto = await this.getUser(userId);
    const userToCustomer:CurrentlyInIrishDto= new CurrentlyInIrishDto();
    userToCustomer.name=user.name;
    userToCustomer.gender=user.gender;
    userToCustomer.isAnonym=user.isAnonym;
    userToCustomer.token=user.token;
    userToCustomer.uid = user.uid;
    userToCustomer.timestamp = new Date().toISOString()
    userToCustomer.profileImage=user.profileImage;
    this.socket.handleNewCustomer(userToCustomer);
    await this.network.setData(userToCustomer.toJson(),FirebaseColumns.CUSTOMERS,userToCustomer.uid);
  }



}
