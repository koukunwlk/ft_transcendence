import { Module } from '@nestjs/common';
import { LobbyController } from './lobby.controller';
import { LobbyGateway } from './lobby.gateway';
import { LobbyService } from './lobby.service';
import { MatchHistoryModule } from '@/match-history/match-history.module';
import { MatchEndedListner } from '@/match-history/listners/match-ended.listner';
import { MatchStartedListner } from '@/match-history/listners/match-started.listner';
import { MatchHistoryService } from '@/match-history/service/match-history.service';
import { UserService } from '@/user/service/user.service';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [MatchHistoryModule, UserModule],
  controllers: [LobbyController],
  providers: [LobbyGateway, LobbyService, MatchStartedListner, MatchEndedListner, MatchHistoryService, UserService],
})
export class LobbyModule {}
