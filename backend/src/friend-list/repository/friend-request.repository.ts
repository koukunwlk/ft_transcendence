import { FindOneOptions } from "typeorm";
import { FriendListStatusEnum, FriendRequest } from "../domain/model/friend-list.model";

export abstract class FriendRequestRepository {
    abstract insertFriendRequest(senderId: string, receiverId: string): Promise<void>;
    abstract updateFriendRequest(friedRequest: string, status: FriendListStatusEnum): Promise<FriendRequest>;
    abstract findOne(options: FindOneOptions<FriendRequest>): Promise<FriendRequest>;
    abstract getReceivedFriendRequests(userId: string): Promise<FriendRequest[]>;
    abstract getSendedFriendRequests(userId: string): Promise<FriendRequest[]>;
    abstract getFriendList(userId: string): Promise<FriendRequest[]>;
}