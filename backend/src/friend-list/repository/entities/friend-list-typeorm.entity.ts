import { FriendListStatusEnum } from "@/friend-list/domain/model/friend-list.model";
import { UserEntity } from "@/user/entities/user.entity";
import { Column, Entity, ManyToMany } from "typeorm";

@Entity("friend_list")
export class FriendListTypeormEntity {
    @Column({ primary: true, generated: "uuid" })
    id: string;

    @ManyToMany(() => UserEntity)
    user: UserEntity;

    @ManyToMany(() => UserEntity)
    friend: UserEntity

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
