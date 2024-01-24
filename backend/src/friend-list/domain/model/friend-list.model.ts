import { Model } from "@/common/domain/model/model";
import { User } from "@/user/domain/model/user.model";


export enum FriendListStatusEnum {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    BLOCKED = "BLOCKED",
    CANCELLED = "CANCELLED",
}

export type FriendRequest = {
    id: string;
    status: FriendListStatusEnum;
    senderId: string;
    receiverId: string;
};

export type FriendRow = {
    friendId: string;
    ownerId: string;
};

export type FriendList = {
    userId: string;
    friendRequests?: FriendRequest[];
    friends?: FriendRow[];
};
export class FriendListModel extends Model<FriendList> {
    constructor({ userId, friendRequests, friends }: FriendList, id?: string) {
        super(id);
        this.props.userId = userId;
        this.props.friendRequests = friendRequests || [];
        this.props.friends = friends || [];
    }

    getUserId(): string {
        return this.props.userId;
    }

    getFriendRequests(): FriendRequest[] {
        return this.props.friendRequests;
    }

    getFriends(): FriendRow[] {
        return this.props.friends || [];
    }

    setFriends(friends: FriendRow[]): void {
        this.props.friends = friends;
    }

    setFriendRequests(friendRequests: FriendRequest[]): void {
        this.props.friendRequests = friendRequests;
    }
}