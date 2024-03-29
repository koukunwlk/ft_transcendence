import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@/user/user.module';
import { FortyTwoStrategy } from './42-auth/42.strategy.service';
import { UserService } from '@/user/service/user.service';
import { UserRepositoryProvider } from '@/user/repository/user.repository.provider';
import { JwtStrategy } from './jwt-auth/jwt-strategy';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from '@/user/repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    UserModule,
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [
    AuthService,
    FortyTwoStrategy,
    JwtService,
    UserService,
    UserRepositoryProvider
    
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
