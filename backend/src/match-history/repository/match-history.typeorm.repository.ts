import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MatchHistoryTypeormEntity } from "./entities/match-history.typeorm.entity";
import { MatchHistory } from "../model/match-history.model";
import { Injectable } from "@nestjs/common";
import { User } from "@/user/domain/model/user.model";

@Injectable()
export class MatchHistoryTypeormRepository {
    constructor(
        @InjectRepository(MatchHistoryTypeormEntity)
        private readonly matchHistoryRepository: Repository<MatchHistoryTypeormEntity>
    ) { }

    async save(matchHistory: MatchHistory): Promise<void> {
        await this.matchHistoryRepository.save(matchHistory.toPersistence());
    }

    async findAllByPlayerId(playerId: string): Promise<MatchHistory[]> {
        const persistenceMatches = await this.matchHistoryRepository.find({ where: [
           {playerOne: {id: playerId}},
           {playerTwo: {id: playerId}},
        ] });
        const parsedMatches = persistenceMatches.map((match) => {
            const playerOne = new User(match.playerOne, match.playerOne.id);
            const playerTwo = new User(match.playerTwo, match.playerTwo.id);
            return new MatchHistory({
                playerOne: playerOne.toSimpleEntity(),
                playerOneGoalsCount: match.playerOneGoalsCount,
                playerTwo: playerTwo.toSimpleEntity(),
                playerTwoGoalsCount: match.playerTwoGoalsCount,
                winnerId: match?.winner?.id,
                matchType: match.matchType,
                matchDuration: match.matchDuration,
                createdAt: match.createdAt,
                updatedAt: match.updatedAt,
            }, match.id);
        });
        return parsedMatches
    }

    async findAllByPlayerIdAndMatchType(playerId: string, matchType: string): Promise<MatchHistory[]> {
        const persistenceMatches = await this.matchHistoryRepository.find({where: [
            {playerOne: {id: playerId}, matchType},
            {playerTwo: {id: playerId}, matchType},
        ] });

        // return persistenceMatches.map((match) => {
        //     const playerOne = new User(match.playerOne);
        //     const playerTwo = new User(match.playerTwo);
        //     return new MatchHistory({
        //         playerOne: playerOne.toSimpleEntity(),
        //         playerOneGoalsCount: match.playerOneGoalsCount,
        //         playerTwo: playerTwo.toSimpleEntity(),
        //         playerTwoGoalsCount: match.playerTwoGoalsCount,
        //         winnerId: match.winner.id,
        //         matchType: match.matchType,
        //         matchDuration: match.matchDuration,
        //         createdAt: match.createdAt,
        //         updatedAt: match.updatedAt,
        //     }, match.id);
        // });
        return []
    }

    async findAll(): Promise<MatchHistory[]> {
        const persistenceMatches = await this.matchHistoryRepository.find();
        // return persistenceMatches.map((match) => {
        //     const playerOne = new User(match.playerOne);
        //     const playerTwo = new User(match.playerTwo);
        //     return new MatchHistory({
        //         playerOne: playerOne.toSimpleEntity(),
        //         playerOneGoalsCount: match.playerOneGoalsCount,
        //         playerTwo: playerTwo.toSimpleEntity(),
        //         playerTwoGoalsCount: match.playerTwoGoalsCount,
        //         winnerId: match.winner.id,
        //         matchType: match.matchType,
        //         matchDuration: match.matchDuration,
        //         createdAt: match.createdAt,
        //         updatedAt: match.updatedAt,
        //     }, match.id);
        // });
        return []
    }

    async findById(id: string): Promise<MatchHistory> {
    //     const persistenceMatches = await this.matchHistoryRepository.findOne({
    //         where: { id },
    //     });
    //     const playerOne = new User(persistenceMatches.playerOne);
    //     const playerTwo = new User(persistenceMatches.playerTwo);
    //     return new MatchHistory({
    //         playerOne: playerOne.toSimpleEntity(),
    //         playerOneGoalsCount: persistenceMatches.playerOneGoalsCount,
    //         playerTwo: playerTwo.toSimpleEntity(),
    //         playerTwoGoalsCount: persistenceMatches.playerTwoGoalsCount,
    //         winnerId: persistenceMatches.winner.id,
    //         matchType: persistenceMatches.matchType,
    //         matchDuration: persistenceMatches.matchDuration,
    //         createdAt: persistenceMatches.createdAt,
    //         updatedAt: persistenceMatches.updatedAt,
    //     }, persistenceMatches.id);
    // }
    return null;
    }
}