import { Model } from "@/common/domain/model/model";

type MatchPlayer = {
    id: string;
    username?: string;
    nickname?: string;
}

export type MatchHistoryType = {
    playerOne: MatchPlayer;
    playerOneGoalsCount?: number;
    playerTwo: MatchPlayer;
    playerTwoGoalsCount?: number;
    winnerId?: string;
    matchType?: string;
    matchDuration?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class MatchHistory extends Model<MatchHistoryType> {
    protected props: MatchHistoryType;
    constructor(data: MatchHistoryType, id?: string) {
        super(id);
        this.props = data;
    }

    getId(): string {
        return this.id;
    }

    getPlayerOneGoalsCount(): number {
        return this.props.playerOneGoalsCount;
    }

    getPlayerOne(): MatchPlayer {
        return this.props.playerOne;
    }

    getPlayerTwoGoalsCount(): number {
        return this.props.playerTwoGoalsCount;
    }

    getWinnerId(): string {
        return this.props.winnerId;
    }

    getMatchType(): string {
        return this.props.matchType;
    }

    getMatchDuration(): string {
        return this.props.matchDuration;
    }

    getCreatedAt(): Date {
        return this.props.createdAt;
    }

    getUpdatedAt(): Date {
        return this.props.updatedAt;
    }

    setPlayerOne(matchPlayer: MatchPlayer): void {
        this.props.playerOne = matchPlayer;
    }

    setPlayerOneGoalsCount(playerOneGoalsCount: number): void {
        this.props.playerOneGoalsCount = playerOneGoalsCount;
    }

    setPlayerTwo(matchPlayer: MatchPlayer): void {
        this.props.playerTwo = matchPlayer;
    }

    setPlayerTwoGoalsCount(playerTwoGoalsCount: number): void {
        this.props.playerTwoGoalsCount = playerTwoGoalsCount;
    }

    setWinnerId(winnerId: string): void {
        this.props.winnerId = winnerId;
    }

    setMatchType(matchType: string): void {
        this.props.matchType = matchType;
    }

    setMatchDuration(matchDuration: string): void {
        this.props.matchDuration = matchDuration;
    }

    setCreatedAt(createdAt: Date): void {
        this.props.createdAt = createdAt;
    }

    setUpdatedAt(updatedAt: Date): void {
        this.props.updatedAt = updatedAt;
    }
}