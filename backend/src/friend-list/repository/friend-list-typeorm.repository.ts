import { FriendList, FriendListModel, FriendRequest } from "../domain/model/friend-list.model";
import { FriendListRepository } from "./friend-list.respository";
import { FriendListTypeormEntity } from "./entities/friend-list-typeorm.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { FriendRequestTypeormEntity } from "./entities/friend-request-typeorm.entity";


@Injectable()
export class FriendListTypeormRepository implements FriendListRepository {
    constructor(
        @InjectRepository(FriendListTypeormEntity)
        private readonly typeormRepository: Repository<FriendListTypeormEntity>,
    ) { }

    async getFriendList(userId: string): Promise<FriendListModel> {
        const friendList = await this.typeormRepository.findOne({
            where: { userId: userId },
        });

        const friendRow = friendList.friendsId.map(friendId => {
            return { friendId: friendId, ownerId: userId };
        }
        );

        const friendListResult = new FriendListModel({
            userId: friendList.userId,
            friends: friendRow,
        }, friendList.id);

        return friendListResult;
    }

    async insertFriend(friendRequest: FriendRequest) {
        const friendList = await this.typeormRepository.findOne({
            where: { userId: friendRequest.senderId },
        });

        if (friendList) {
            friendList.friendsId.push(friendRequest.receiverId);
            await this.typeormRepository.save(friendList);
        } else {
            await this.typeormRepository.insert({ userId: friendRequest.senderId, friendsId: [friendRequest.receiverId] });
        }
    }
}