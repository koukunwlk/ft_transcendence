import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserRepositoryProvider } from './repository/user.repository.provider';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserRepositoryProvider],
  exports: [UserService],
})
export class UserModule {}
