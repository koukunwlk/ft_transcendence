
export interface MatchEndedEvent {
    playerOneId: string;
    playerOneGoalsCount?: number;
    playerTwoId: string;
    playerTwoGoalsCount?: number;
    winnerId: string;
    matchType: string;
    matchDuration: string;
}