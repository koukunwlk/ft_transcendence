import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { FriendListService } from "./service/friend-list.service";
import { create } from 'domain';
import { HandleFriendRequestDto } from './dto/handle-friend-request.dto';

@Controller("friend-list")
export class FriendListController {
    constructor(
        @Inject(FriendListService)
        private readonly friendListService: FriendListService
    ) { }
    @Get("received-friend-requests/:id")
    async getReceivedFriendRequests(@Param("id") id: string) {
        return this.friendListService.getReceivedFriendRequests(id);
    }

    @Get("sended-friend-requests/:id")
    async getSendedFriendRequests(@Param("id") id: string) {
        return this.friendListService.getSendedFriendRequests(id);
    }

    @Get("friend-list/:id")
    async getFriendList(@Param("id") id: string) {
        return this.friendListService.getFriendList(id);
    }

    @Post("send-friend-request/:userId/:receiverId")
    async sendFriendRequest(@Param("userId") userId: string, @Param("receiverId") receiverId: string) {
        return this.friendListService.sendFriendRequest(userId, receiverId);
    }

    @Post("handle-friend-request/:userId")
    async handleFriendRequest(@Param("userId") userId: string, @Body() handleFriendRequestBody: HandleFriendRequestDto) {
        const { friendId, status } = handleFriendRequestBody;
        return this.friendListService.handleFriendRequest(userId, friendId, status);
    }
}