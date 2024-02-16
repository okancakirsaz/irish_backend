import { Module } from "@nestjs/common";
import { CronjobManager } from "./cronjob_manager";
import { SocketGateway } from "src/core/web_socket_gateway";

@Module(
    {
        providers:[CronjobManager,SocketGateway]
    }
)
export class CronjobManagerModule{}