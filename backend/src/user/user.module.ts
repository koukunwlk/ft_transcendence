import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserRepositoryProvider } from './repository/user.repository.provider';
import { UserController } from './user.controller';
@Module({
  controllers: [UserController],
  providers: [UserService, UserRepositoryProvider],
})
export class UserModule {}
