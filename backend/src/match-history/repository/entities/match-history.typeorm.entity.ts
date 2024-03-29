import { UserEntity } from "@/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("match_history")
export class MatchHistoryTypeormEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => UserEntity, {
        eager: true
    })
    playerOne: UserEntity;

    @Column("integer", { nullable: true })
    playerOneGoalsCount: number;

    @ManyToOne(() => UserEntity, {
        eager: true
    })
    playerTwo: UserEntity;

    @Column("integer", { nullable: true })
    playerTwoGoalsCount: number;

    @ManyToOne(() => UserEntity, { nullable: true })
    @JoinColumn({ name: "winnerId" })
    winner: UserEntity;

    @Column()
    matchType: string;

    @Column({ nullable: true })
    matchDuration: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}
