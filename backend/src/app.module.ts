import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PongGateway } from './pong/pong.gateway';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [],
  providers: [PongGateway],
})
export class AppModule {}
