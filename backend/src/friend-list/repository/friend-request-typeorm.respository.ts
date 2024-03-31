import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FriendRequestTypeormEntity } from "./entities/friend-request-typeorm.entity";
import { FindOneOptions, Repository } from "typeorm";
import { User } from "@/user/domain/model/user.model";


@Injectable()
export class FriendRequestTypeormRepository {
    constructor(
        @InjectRepository(FriendRequestTypeormEntity)
        private readonly typeormRepository: Repository<FriendRequestTypeormEntity>,
    ) { }

    async insertFriendRequest(userId: string, receiverId: string) {
        await this.typeormRepository.insert({ sender: {id: userId}, receiver: {id: receiverId}, status: "PENDING"});
    }

    async findOne(options: FindOneOptions<FriendRequestTypeormEntity>) {
        return await this.typeormRepository.findOne({
            where: options.where,
        });
    }

    async getReceivedFriendRequests(userId: string) {
        const friendRequests = await this.typeormRepository.find({
            where: { receiver: {id: userId} }
        });
        if(friendRequests.length === 0)
            return [];
        const mappedFriendRequests = friendRequests.map(friendRequest => {
            const sender = new User(friendRequest.sender, friendRequest.sender.id);
            const receiver = new User(friendRequest.receiver, friendRequest.receiver.id);
            return {
                id: friendRequest.id,
                sender: sender.toSimpleEntity(),
                receiver: receiver.toSimpleEntity(),
                status: friendRequest.status
            }
        });
        
        return mappedFriendRequests.filter(friendRequest => friendRequest.status === "PENDING");
    }

    async getSendedFriendRequests(userId: string) {
        return await this.typeormRepository.find({ where: { sender: {id: userId} } });
    }

    async updateFriendRequest(id: string, status: string) {
        return await this.typeormRepository.save({ id, status });
    }

    async getFriendList(userId: string) {
        const friendRequests = await this.typeormRepository.find({
            where: [
                { sender: { id: userId }, status: "ACCEPTED"},
                { receiver: { id: userId }, status: "ACCEPTED"}
            ]
        });
        const mappedFriendRequests = friendRequests.map(friendRequest => {
            const sender = new User(friendRequest.sender, friendRequest.sender.id);
            const receiver = new User(friendRequest.receiver, friendRequest.receiver.id);
            if(sender.id === userId)
                return receiver.toFriendList();
            return sender.toFriendList();
        })
        return mappedFriendRequests;
    }

    async insertFriend(friendRequest: FriendRequestTypeormEntity) {
        await this.typeormRepository.insert({ sender: friendRequest.sender, receiver: friendRequest.receiver, status: "ACCEPTED"});
    }
}