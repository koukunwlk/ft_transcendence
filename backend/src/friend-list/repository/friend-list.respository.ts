import { FriendListModel, FriendListStatusEnum, FriendRequest } from "../domain/model/friend-list.model";

export abstract class FriendListRepository {
    abstract insertFriendRequest(senderId: string, receiverId: string): Promise<void>;
    abstract updateFriendRequest(friedRequest: string, status: FriendListStatusEnum): Promise<FriendRequest>;
    abstract findOne(options: Partial<FriendRequest>): Promise<FriendRequest>;
    abstract getFriendList(userId: string): Promise<FriendListModel>;
    abstract insertFriend(friendRequest: FriendRequest): Promise<void>;
    abstract getReceivedFriendRequests(userId: string): Promise<FriendRequest[]>;
    abstract getSendedFriendRequests(userId: string): Promise<FriendRequest[]>;
}