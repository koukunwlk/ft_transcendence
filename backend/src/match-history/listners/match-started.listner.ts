import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { MatchStartedEvent } from "../events/match-started.event";
import { MatchHistoryService } from "../service/match-history.service";
import { MatchHistory } from "../model/match-history.model";


@Injectable()
export class MatchStartedListner {
    constructor(
        @Inject(MatchHistoryService)
        private readonly matchHistoryService: MatchHistoryService
    ) { }

    @OnEvent('match-started')
    handleMatchStartedEvent(match: MatchStartedEvent, matchId: string) {
        const newMatch = new MatchHistory({
            playerOneId: match.playerOneId,
            playerTwoId: match.playerTwoId,
            matchType: match.matchType,
            playerOneGoalsCount: match.playerOneGoals,
            playerTwoGoalsCount: match.playerTwoGoals
        }, matchId);
        this.matchHistoryService.persistMatch(newMatch);
    }
}