import { Injectable } from "@nestjs/common";
import { FriendListModel, FriendRequest, FriendListStatusEnum, FriendRow } from "../domain/model/friend-list.model";
import { FriendListRepository } from "./friend-list.respository";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FriendListInMemoryRepostiory implements FriendListRepository {
    private friendLists: FriendListModel[] = [];
    private usersFriends: FriendRow[] = [];
    private friendRequests: FriendRequest[] = [];

    constructor() {
        this.friendLists = [];
        this.friendRequests = [];
        this.usersFriends = [];
    }

    async insertFriendRequest(senderId: string, receiverId: string): Promise<void> {
        const friendRequest = {
            id: uuidv4(),
            status: FriendListStatusEnum.PENDING,
            senderId,
            receiverId
        };
        this.friendRequests.push(friendRequest);
    }

    async insertFriend(friendRequest: FriendRequest): Promise<void> {
        const friendRow = {
            ownerId: friendRequest.senderId,
            friendId: friendRequest.receiverId
        };
        this.usersFriends.push(friendRow);
        return Promise.resolve();
    }

    async updateFriendRequest(friedRequestId, status: FriendListStatusEnum): Promise<FriendRequest> {
        const friendRequest = this.friendRequests.find(friendRequest => friendRequest.id === friedRequestId);
        if (friendRequest) {
            friendRequest.status = status;
            return Promise.resolve(friendRequest);
        }
        return null;
    }

    async getFriendList(userId: string): Promise<FriendListModel> {
        const userFriends = this.usersFriends.filter(friend => friend.ownerId === userId || friend.friendId === userId);
        const friendList = new FriendListModel({ userId, friends: userFriends });
        if (friendList) {
            return friendList;
        }
    }

    async findOne(options: Partial<FriendRequest>): Promise<FriendRequest> {
        if (this.friendRequests.length === 0) {
            return null;
        }
        const friendRequest = this.friendRequests.find(friendRequest => friendRequest.senderId === options.senderId && friendRequest.receiverId === options.receiverId);
        if (friendRequest) {
            return Promise.resolve(friendRequest);
        }
        return null
    }

    async getReceivedFriendRequests(userId: string): Promise<FriendRequest[]> {
        const friendRequests = this.friendRequests.filter(friendRequest => friendRequest.receiverId === userId);
        return Promise.resolve(friendRequests);
    }
    async getSendedFriendRequests(userId: string): Promise<FriendRequest[]> {
        const friendRequests = this.friendRequests.filter(friendRequest => friendRequest.senderId === userId);
        return Promise.resolve(friendRequests);
    }
}