import { Module } from "@nestjs/common";
import { CommunityService } from "./community.service";
import { CommunityController } from "./community.controller";
import { SocketGateway } from "src/core/web_socket_gateway";

@Module({
    providers:[CommunityService,SocketGateway],
    controllers:[CommunityController]
})
export class CommunityModule{}