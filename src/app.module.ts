import { Module } from '@nestjs/common';
import { AuthModule } from './features/auth/auth.module';
import { CommunityModule } from './features/community/community.module';
import { MenuModule } from './features/menu/menu.module';
import { UserModule } from './features/user/user.module';
import { GamesModule } from './features/games/games.module';
import { OrderModule } from './features/order/order.module';
import { SocketGateway } from './core/web_socket_gateway';
import { ScheduleModule } from '@nestjs/schedule';
import { CronjobManager } from './core/managers/cronjobs/cronjob_manager';
import { CronjobManagerModule } from './core/managers/cronjobs/cronjob_manager.module';
import { GamesGateway } from './features/games/games_gateway';


@Module({
  imports: [
    AuthModule,CommunityModule,MenuModule,UserModule,GamesModule,OrderModule,ScheduleModule.forRoot(),CronjobManagerModule],
  providers:[SocketGateway,GamesGateway],
  controllers: [],
})
export class AppModule {}
