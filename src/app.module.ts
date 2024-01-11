import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommunityModule } from './community/community.module';
import { MenuModule } from './menu/menu.module';


@Module({
  imports: [
    AuthModule,CommunityModule,MenuModule],
  controllers: [],
})
export class AppModule {}
