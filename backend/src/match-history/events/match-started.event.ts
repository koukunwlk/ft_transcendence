export interface MatchStartedEvent {
    playerOneId: string;
    playerTwoId: string;
    matchType: string;
    playerOneGoals: number;
    playerTwoGoals: number;
}