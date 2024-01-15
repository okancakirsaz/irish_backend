import { Module } from "@nestjs/common";
import { GamesService } from "./games.service";
import { GamesController } from "./games.controllr";

@Module({
    providers:[GamesService],
    controllers:[GamesController]
})
export class GamesModule{}