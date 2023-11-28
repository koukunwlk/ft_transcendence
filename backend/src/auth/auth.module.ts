import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@/user/user.module';
import { FortyTwoStrategy } from './42-auth/42.strategy.service';
import { UserService } from '@/user/service/user.service';
import { UserRepositoryProvider } from '@/user/repository/user.repository.provider';

@Module({
  imports: [UserModule],
  providers: [AuthService, FortyTwoStrategy, UserService, UserRepositoryProvider],
  controllers: [AuthController]
})
export class AuthModule {}
