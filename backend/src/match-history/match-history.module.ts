import { Module } from '@nestjs/common';
import { MatchHistoryController } from './match-history.controller';
import { MatchHistoryRepositoryProvider } from './repository/match-history.repository.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchHistoryTypeormEntity } from './repository/entities/match-history.typeorm.entity';
import { MatchStartedListner } from './listners/match-started.listner';
import { AuthModule } from '@/auth/auth.module';
import { MatchHistoryService } from './service/match-history.service';
import { MatchEndedListner } from './listners/match-ended.listner';

@Module({
  imports: [TypeOrmModule.forFeature([MatchHistoryTypeormEntity]), AuthModule],
  controllers: [MatchHistoryController],
  providers: [MatchHistoryRepositoryProvider, MatchStartedListner, MatchEndedListner,MatchHistoryService]
})
export class MatchHistoryModule { }
