import { Column, Entity, ManyToOne } from "typeorm";
import { FriendListStatusEnum } from "@/friend-list/domain/model/friend-list.model";
import { UserEntity } from "@/user/entities/user.entity";


@Entity("friend_request")
export class FriendRequestTypeormEntity {
    @Column({ primary: true, generated: "uuid" })

    id: string;

    @ManyToOne(() => UserEntity, {
        eager: true,
    }) 
    sender: UserEntity;

    @ManyToOne(() => UserEntity, {
        eager: true,
    })
    receiver: UserEntity;

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