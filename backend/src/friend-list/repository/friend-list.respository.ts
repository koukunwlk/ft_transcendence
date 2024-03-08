import { FriendListModel, FriendRequest } from "../domain/model/friend-list.model";

export abstract class FriendListRepository {
    abstract getFriendList(userId: string): Promise<FriendListModel>;
    abstract insertFriend(friendRequest: FriendRequest): Promise<void>;
}