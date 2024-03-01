import { FriendListStatusEnum } from "@/friend-list/domain/model/friend-list.model";
import { Column, Entity } from "typeorm";

@Entity("friend_list")
export class FriendListTypeormEntity {
    @Column({ primary: true, generated: "uuid" })
    id: string;

    @Column()
    userId: string;

    @Column("text", { array: true })
    friendsId: string[];

    @Column({
        enum: FriendListStatusEnum,
    })
    status: string;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    })
    updatedAt: Date;
}
