import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { FriendListModule } from './friend-list/friend-list.module';
import { AuthModule } from './auth/auth.module'
import { MatchHistoryModule } from './match-history/match-history.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
@Module({
  imports: [
    UserModule,
    FriendListModule,
    AuthModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    MatchHistoryModule,
    EventEmitterModule.forRoot()
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
