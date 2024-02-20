import { Module } from "@nestjs/common";
import { GamesService } from "./games.service";
import { GamesController } from "./games.controller";
import { SocketGateway } from "src/core/web_socket_gateway";
import { GamesGateway } from "./games_gateway";

@Module({
    providers:[GamesService,GamesGateway,SocketGateway],
    controllers:[GamesController]
})
export class GamesModule{}