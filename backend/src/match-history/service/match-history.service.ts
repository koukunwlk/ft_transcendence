import { Inject, Injectable } from "@nestjs/common";
import { MatchHistoryRepository } from "../repository/match-history.repository";
import { MatchHistory } from "../model/match-history.model";


@Injectable()
export class MatchHistoryService {

    @Inject(MatchHistoryRepository)
    private readonly matchHistoryRepository: MatchHistoryRepository;


    async persistMatch(matchHistory: MatchHistory): Promise<void> {
        await this.matchHistoryRepository.save(matchHistory);
    }

    async findAllByPlayerId(playerId: string): Promise<MatchHistory[]> {
        return await this.matchHistoryRepository.findAllByPlayerId(playerId);
    }

    async findAllByPlayerIdAndMatchType(playerId: string, matchType: string): Promise<MatchHistory[]> {
        return await this.matchHistoryRepository.findAllByPlayerIdAndMatchType(playerId, matchType);
    }

    async findAll(): Promise<MatchHistory[]> {
        return await this.matchHistoryRepository.findAll();
    }

    async findById(id: string): Promise<MatchHistory> {
        return await this.matchHistoryRepository.findById(id);
    }
}