import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MatchHistoryTypeormEntity } from "./entities/match-history.typeorm.entity";
import { MatchHistory } from "../model/match-history.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MatchHistoryTypeormRepository {
    constructor(
        @InjectRepository(MatchHistoryTypeormEntity)
        private readonly matchHistoryRepository: Repository<MatchHistoryTypeormEntity>
    ) { }

    async save(matchHistory: MatchHistory): Promise<void> {
        await this.matchHistoryRepository.save(matchHistory.toPersistence());
    }

    async findAllByPlayerId(playerId: string): Promise<MatchHistoryTypeormEntity[]> {
        return await this.matchHistoryRepository.find({ where: [
            { playerOneId: playerId },
            { playerTwoId: playerId }
        ] });
    }

    async findAllByPlayerIdAndMatchType(playerId: string, matchType: string): Promise<MatchHistoryTypeormEntity[]> {
        return await this.matchHistoryRepository.find({where: [
            { playerOneId: playerId, matchType },
            { playerTwoId: playerId, matchType },
        ] });
    }

    async findAll(): Promise<MatchHistoryTypeormEntity[]> {
        return await this.matchHistoryRepository.find();
    }

    async findById(id: string): Promise<MatchHistoryTypeormEntity> {
        return await this.matchHistoryRepository.findOne({
            where: { id },
        });
    }
}