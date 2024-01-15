import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommunityModule } from './community/community.module';
import { MenuModule } from './menu/menu.module';
import { UserModule } from './user/user.module';
import { GamesModule } from './games/games.module';


@Module({
  imports: [
    AuthModule,CommunityModule,MenuModule,UserModule,GamesModule],
  controllers: [],
})
export class AppModule {}
