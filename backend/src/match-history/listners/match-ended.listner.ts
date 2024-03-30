import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { MatchHistoryService } from "../service/match-history.service";
import { MatchHistory } from "../model/match-history.model";
import { MatchEndedEvent } from "../events/match-ended.event";


@Injectable()
export class MatchEndedListner {
    constructor(
        @Inject(MatchHistoryService)
        private readonly matchHistoryService: MatchHistoryService
    ) { }

    @OnEvent('match-ended')
    handleMatchEndedEvent(match: MatchEndedEvent, matchId: string) {
        console.log("received match ended event", match, matchId)
        const endedMatch = new MatchHistory({
            playerOne: {id: match.playerOneId},
            playerTwo: {id: match.playerTwoId},
            matchType: match.matchType,
            playerOneGoalsCount: match.playerOneGoalsCount,
            playerTwoGoalsCount: match.playerTwoGoalsCount,
            winnerId: match.winnerId,
            matchDuration: match.matchDuration,
        }, matchId);

        console.log("match ended", matchId, endedMatch);
        this.matchHistoryService.persistMatch(endedMatch);
    }
}