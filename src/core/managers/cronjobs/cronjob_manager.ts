import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { FirebaseServices } from "../../firebase_services";
import { FirebaseColumns } from "../../enums/firebase_column_enums";
import { SocketGateway } from "src/core/web_socket_gateway";
import { CurrentlyInIrishDto } from "src/features/community/dto/currently_in_irish.dto";

@Injectable()
export class CronjobManager {
  constructor(private readonly socket:SocketGateway) {}
  private readonly network: FirebaseServices = FirebaseServices.instance;

  @Cron(CronExpression.EVERY_5_SECONDS)
  async syncActiveCustomers() {
    const currentTime:string = new Date().toISOString();
    await this.checkAndDeleteCustomersInDb(currentTime);
  }
  
  private async checkAndDeleteCustomersInDb(currentTime: string) {
    //currentTime like this: '2024-02-12T18:28:18+03:00'
    const currentDate:Date = new Date(currentTime);
    const customers = await this.network.getDocs(FirebaseColumns.CUSTOMERS);


    for(const index in customers){
    //Formula: (current time - order creation time) / (1000*60*60)->For convert milliseconds to hours
    //After then if hoursDifference >= 2 delete this customer from customer list.
    const targetTime:Date = new Date(customers[index]['timestamp']);
    const asMilliSecond:number = currentDate.getTime()- targetTime.getTime();
    const hoursDifference:number = asMilliSecond / (1000 * 60 * 60);
    if(hoursDifference >=2){
        await this.network.deleteDoc(FirebaseColumns.CUSTOMERS,customers[index]["uid"]);
        this.socket.handleDeleteCustomer(new CurrentlyInIrishDto().fromJsonWithReturn(customers[index]))
    }
    }
  }
}
