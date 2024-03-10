import { Column, Entity } from "typeorm";


@Entity("match_history")
export class MatchHistoryTypeormEntity {
    @Column("uuid", { primary: true })
    id: string;

    @Column("uuid")
    playerOneId: string;

    @Column("integer", {
        nullable: true,
    })
    playerOneGoalsCount: number;

    @Column("uuid")
    playerTwoId: string;

    @Column("integer", {
        nullable: true,
    })
    playerTwoGoalsCount: number;

    @Column("uuid", {
        nullable: true,
    })
    winnerId: string;

    @Column("varchar")
    matchType: string;

    @Column("varchar", {
        nullable: true,
    })
    matchDuration: string;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: string;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    })
    updatedAt: string;
}
