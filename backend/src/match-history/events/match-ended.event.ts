import { Injectable } from "@nestjs/common";

@Injectable()
export class MatchEndedEvent {
    playerOneId: string;
    playerOneGoalsCount?: number;
    playerTwoId: string;
    playerTwoGoalsCount?: number;
    winnerId: string;
    matchType: string;
    matchDuration: string;
}