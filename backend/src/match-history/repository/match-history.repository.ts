import { MatchHistory } from "../model/match-history.model";

export abstract class MatchHistoryRepository {
    abstract save(matchHistory: MatchHistory): Promise<void>;
    abstract findAllByPlayerId(playerId: string): Promise<MatchHistory[]>;
    abstract findAllByPlayerIdAndMatchType(playerId: string, matchType: string): Promise<MatchHistory[]>;
    abstract findAll(): Promise<MatchHistory[]>;
    abstract findById(id: string): Promise<MatchHistory>;
}