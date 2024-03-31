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
        const friendList = await this.typeormRepository.find({
            where: [
                { user: { id: userId } },
                { friend: { id: userId } }
            ]
        })

        console.log(friendList);

        return Promise.resolve(null);
    }

    async insertFriend(friendRequest: FriendRequest): Promise<void> {
        await this.typeormRepository.insert({ user: { id: friendRequest.sender.id }, friend: { id: friendRequest.receiver.id }, status: "ACCEPTED" });
    }
}