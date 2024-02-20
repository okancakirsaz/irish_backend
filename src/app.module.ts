import { Module } from '@nestjs/common';
import { AuthModule } from './features/auth/auth.module';
import { CommunityModule } from './features/community/community.module';
import { MenuModule } from './features/menu/menu.module';
import { UserModule } from './features/user/user.module';
import { GamesModule } from './features/games/games.module';
import { OrderModule } from './features/order/order.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronjobManagerModule } from './core/managers/cronjobs/cronjob_manager.module';


@Module({
  imports: [
    AuthModule,CommunityModule,MenuModule,UserModule,GamesModule,OrderModule,ScheduleModule.forRoot(),CronjobManagerModule],
  providers:[],
  controllers: [],
})
export class AppModule {}
