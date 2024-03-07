import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserRepositoryProvider } from './repository/user.repository.provider';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { JwtStrategy } from '@/auth/jwt-auth/jwt-strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserRepositoryProvider, JwtService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
