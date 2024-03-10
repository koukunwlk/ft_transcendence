import { Model } from "@/common/domain/model/model";

export type MatchHistoryType = {
    playerOneId: string;
    playerOneGoalsCount?: number;
    playerTwoId: string;
    playerTwoGoalsCount?: number;
    winnerId?: string;
    matchType?: string;
    matchDuration?: string;
    createdAt?: string;
    updatedAt?: string;
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

    getPlayerOneId(): string {
        return this.props.playerOneId;
    }

    getPlayerOneGoalsCount(): number {
        return this.props.playerOneGoalsCount;
    }

    getPlayerTwoId(): string {
        return this.props.playerTwoId;
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

    getCreatedAt(): string {
        return this.props.createdAt;
    }

    getUpdatedAt(): string {
        return this.props.updatedAt;
    }

    setPlayerOneId(playerOneId: string): void {
        this.props.playerOneId = playerOneId;
    }

    setPlayerOneGoalsCount(playerOneGoalsCount: number): void {
        this.props.playerOneGoalsCount = playerOneGoalsCount;
    }

    setPlayerTwoId(playerTwoId: string): void {
        this.props.playerTwoId = playerTwoId;
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

    setCreatedAt(createdAt: string): void {
        this.props.createdAt = createdAt;
    }

    setUpdatedAt(updatedAt: string): void {
        this.props.updatedAt = updatedAt;
    }
}