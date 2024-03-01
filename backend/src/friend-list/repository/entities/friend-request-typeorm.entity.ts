import { Column, Entity } from "typeorm";
import { FriendListStatusEnum } from "@/friend-list/domain/model/friend-list.model";


@Entity("friend_request")
export class FriendRequestTypeormEntity {
    @Column({ primary: true, generated: "uuid" })
    id: string;
    @Column()
    senderId: string;

    @Column()
    receiverId: string;

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