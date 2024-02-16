import { Injectable } from "@nestjs/common";
import { EventDto } from "./dto/event.dto";
import { FirebaseServices } from "src/core/firebase_services";
import { FirebaseColumns } from "src/core/enums/firebase_column_enums";
import { SocketGateway } from "src/core/web_socket_gateway";

@Injectable()
export class GamesService{
    constructor(private readonly socket:SocketGateway) {}

    private readonly network = FirebaseServices.instance;
    async getActiveEvents():Promise<EventDto[]>{
     const response = await this.network.getDocs(FirebaseColumns.EVENTS);
     let responseAsList:EventDto[] = [];
     response.forEach((data)=>{
        const dto:EventDto = new EventDto();
        dto.fromJson(data)
        responseAsList.push(dto)
     });
     return responseAsList;
    }

    async createEvent(params:EventDto):Promise<EventDto>{
        try {
            await this.network.setData(params,FirebaseColumns.EVENTS,params.eventId);
            return params;
        } catch (error) {
            throw Error(error);
        }
    }

    async deleteEvent(params:EventDto):Promise<EventDto>{
        try {
            await this.network.deleteDoc(FirebaseColumns.EVENTS,params.eventId);
            return params;
        } catch (error) {
            throw Error(error);
        }
    }

    async startEvent(params:EventDto):Promise<EventDto>{
        try {
            params.isStarted=true;
            await this.network.updateDocument(FirebaseColumns.EVENTS,params.eventId,params);
            this.socket.handleEventStarted(`Etknlik başladı: ${params.eventName}`);
            return params;
        } catch (error) {
            throw Error(error);
        }
    }
}