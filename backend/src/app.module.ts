import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { FriendListModule } from './friend-list/friend-list.module';
import { AuthModule } from './auth/auth.module'
@Module({
  imports: [
    UserModule,
    FriendListModule,
    TypeOrmModule.forRoot(typeOrmConfig)
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
