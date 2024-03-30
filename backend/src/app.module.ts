import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { FriendListModule } from './friend-list/friend-list.module';
import { AuthModule } from './auth/auth.module'
import { MatchHistoryModule } from './match-history/match-history.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LobbyModule } from './lobby/lobby.module';
import { AppService } from './app.service';
import { AppController } from './app.controller'
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [
    UserModule,
    FriendListModule,
    AuthModule, LobbyModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    MatchHistoryModule,
    EventEmitterModule.forRoot(),
    MulterModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
