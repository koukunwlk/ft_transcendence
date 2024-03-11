import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { FriendListRepository } from "../repository/friend-list.respository";
import { UserService } from "@/user/service/user.service";
import { FriendListStatusEnum, FriendRequest } from "../domain/model/friend-list.model";
import { User } from "@/user/domain/model/user.model";
import { FriendRequestRepository } from "../repository/friend-request.repository";

@Injectable()
export class FriendListService {
    constructor(
        @Inject(FriendListRepository)
        private readonly friendListRepository: FriendListRepository,

        @Inject(FriendRequestRepository)
        private readonly friendRequestRepository: FriendRequestRepository,
        @Inject(UserService)
        private readonly userService: UserService
    ) { }

    async sendFriendRequest(userId: string, receiverId: string) {
        await this.checkIfIsAValidFriendRequest(userId, receiverId);

        await this.friendRequestRepository.insertFriendRequest(userId, receiverId);
    }

    async handleFriendRequest(userId: string, friendId: string, status: FriendListStatusEnum) {
        const isHandlingFriendRequest = true;
        let friendRequest = await this.checkIfIsAValidFriendRequest(userId, friendId, isHandlingFriendRequest);
        this.checkIfUserCanHandleFriendRequest(friendRequest, userId);

        friendRequest = await this.friendRequestRepository.updateFriendRequest(friendRequest.id, status);
        if (friendRequest.status === FriendListStatusEnum.ACCEPTED) {
            await this.friendListRepository.insertFriend(friendRequest);
        }
    }

    async getFriendList(userId: string): Promise<User[]> {
        const friendList = await this.friendListRepository.getFriendList(userId);
        const friends = friendList.getFriends();
        if (friends.length === 0) {
            return [];
        }

        const parsedFriends = friends.map(friend => {
            if (friend.friendId === userId) {
                return friend.ownerId;
            }
            return friend.friendId;
        }
        );
        return await this.userService.getUsersByIds(parsedFriends);
    }

    async getReceivedFriendRequests(userId: string) {
        const friendRequests = await this.friendRequestRepository.getReceivedFriendRequests(userId);
        return friendRequests.filter(friendRequest => friendRequest.status === FriendListStatusEnum.PENDING);
    }

    async getSendedFriendRequests(userId: string) {
        const friendRequests = await this.friendRequestRepository.getSendedFriendRequests(userId);
        return friendRequests.filter(friendRequest => friendRequest.status === FriendListStatusEnum.PENDING);
    }

    private async checkIfIsAValidFriendRequest(userId: string, friendId: string, isHandlingFriendRequest: boolean = false) {
        const [sender, receiver] = await Promise.all([
            this.userService.getUserById(userId),
            this.userService.getUserById(friendId)
        ]);
        if (!sender || !receiver) {
            throw new BadRequestException("Invalid sender or receiver");
        }
        return await this.checkIfFriendRequestExists(userId, friendId, isHandlingFriendRequest);
    }

    private async checkIfFriendRequestExists(userId: string, friendId: string, isHandlingFriendRequest: boolean) {
        const [persistedFriendRequestAsSender, persistedFriendRequestAsReceiver] = await Promise.all([
            this.friendRequestRepository.findOne({ senderId: userId, receiverId: friendId }),
            this.friendRequestRepository.findOne({ senderId: friendId, receiverId: userId }),
        ]);
        if (persistedFriendRequestAsSender) {
            this.checkIfFriendRequestStatus(persistedFriendRequestAsSender);
            if (!isHandlingFriendRequest) {
                throw new BadRequestException("Friend request already sended");
            }

            return persistedFriendRequestAsSender;
        }

        if (persistedFriendRequestAsReceiver) {
            this.checkIfFriendRequestStatus(persistedFriendRequestAsReceiver);
            if (!isHandlingFriendRequest) {
                throw new BadRequestException("Friend request already received");
            }
            return persistedFriendRequestAsReceiver;
        }
    }

    private checkIfFriendRequestStatus(friendRequest: FriendRequest) {
        if (friendRequest.status !== FriendListStatusEnum.PENDING) {
            throw new BadRequestException(`Friend request already handled with status: ${friendRequest.status}`);
        }
    }

    private checkIfUserCanHandleFriendRequest(friendRequest: FriendRequest, userId: string) {
        if (friendRequest.senderId === userId) {
            throw new BadRequestException("User is the sender of this friend request");
        }
        if (friendRequest.senderId !== userId && friendRequest.receiverId !== userId) {
            throw new BadRequestException("User can't handle this friend request");
        }
    }
}