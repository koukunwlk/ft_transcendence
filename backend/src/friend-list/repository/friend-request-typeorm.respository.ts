import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FriendRequestTypeormEntity } from "./entities/friend-request-typeorm.entity";
import { Repository } from "typeorm";


@Injectable()
export class FriendRequestTypeormRepository {
    constructor(
        @InjectRepository(FriendRequestTypeormEntity)
        private readonly typeormRepository: Repository<FriendRequestTypeormEntity>,
    ) { }

    async insertFriendRequest(userId: string, receiverId: string) {
        await this.typeormRepository.insert({ senderId: userId, receiverId });
    }

    async getReceivedFriendRequests(userId: string) {
        return await this.typeormRepository.find({ where: { receiverId: userId } });
    }

    async getSendedFriendRequests(userId: string) {
        return await this.typeormRepository.find({ where: { senderId: userId } });
    }

    async updateFriendRequest(id: string, status: string) {
        return await this.typeormRepository.save({ id, status });
    }

    async insertFriend(friendRequest: FriendRequestTypeormEntity) {
        await this.typeormRepository.insert({ senderId: friendRequest.senderId, receiverId: friendRequest.receiverId, status: "ACCEPTED" });
    }
}