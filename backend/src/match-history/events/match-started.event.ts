import { Injectable } from "@nestjs/common";

@Injectable()
export class MatchStartedEvent {
    playerOneId: string;
    playerTwoId: string;
    matchType: string;
    playerOneGoals: number;
    playerTwoGoals: number;
}