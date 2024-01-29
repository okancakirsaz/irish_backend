import { Module } from '@nestjs/common';
import { AuthModule } from './features/auth/auth.module';
import { CommunityModule } from './features/community/community.module';
import { MenuModule } from './features/menu/menu.module';
import { UserModule } from './features/user/user.module';
import { GamesModule } from './features/games/games.module';
import { OrderModule } from './features/order/order.module';


@Module({
  imports: [
    AuthModule,CommunityModule,MenuModule,UserModule,GamesModule,OrderModule],
  controllers: [],
})
export class AppModule {}
