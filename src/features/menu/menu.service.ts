import { Injectable } from "@nestjs/common";
import { MenuItemDto } from "./dto/menu_item.dto";
import { FirebaseServices } from "src/core/firebase_services";
import { FirebaseColumns } from "src/core/enums/firebase_column_enums";

@Injectable()
export class MenuService {
  private network = FirebaseServices.instance;
  async getMenu(): Promise<MenuItemDto[]> {
    const response = await this.network.getDocs(FirebaseColumns.MENU);
    let responseAsModel: MenuItemDto[] = [];
    response.forEach((element) => {
      let elementAsModel: MenuItemDto = new MenuItemDto();
      elementAsModel.fromJson(element);
      responseAsModel.push(element);
    });
    return responseAsModel;
  }

  async createMenuElement(params: MenuItemDto): Promise<MenuItemDto> {
    try {
      const imagePath: string = await this.network.setImageToStorage(
        params.image,
        params.name,
        "menu"
      );
      params.image = imagePath;
      await this.network.setData(params, FirebaseColumns.MENU, params.name);
      return params;
    } catch (error) {
      throw Error(error);
      //TODO: Make error log system
    }
  }

  async updateMenuElement(params: MenuItemDto): Promise<MenuItemDto> {
    try {
      let dataForSend: Record<string, any> = {};
      params.price = params.price;
      params.materials = params.materials;
      if (params.image != "") {
        const imagePath: string = await this.network.setImageToStorage(
          params.image,
          params.name,
          "menu"
        );
        params.image = imagePath;
        dataForSend = {
          image: params.image,
          price: params.price,
          materials: params.materials,
        };
      } else {
        dataForSend = {
          price: params.price,
          materials: params.materials,
        };
      }

      await this.network.updateDocument(
        FirebaseColumns.MENU,
        params.name,
        dataForSend
      );
      return params;
    } catch (error) {
      throw Error(error);
      //TODO: Make error log system
    }
  }

  async deleteMenuElement(params: MenuItemDto): Promise<MenuItemDto> {
    try {
      await this.network.deleteDoc(FirebaseColumns.MENU, params.name);
      await this.network.deleteImageFromStorage(params.name, "menu");
      return params;
    } catch (error) {
      throw Error(error);
      //TODO: Make error log system
    }
  }

  async getMenuItem(itemName:string):Promise<MenuItemDto>{
    const rawData = (await this.network.getDoc(FirebaseColumns.MENU,itemName)).data();
    const response:MenuItemDto = new MenuItemDto().fromJsonWithReturn(rawData);
    return response;
  }
}
