import { BadRequestException, Body, Controller, Get, HttpException, Inject, Param, Post, Req, Res, UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import { FriendListService } from "./service/friend-list.service";
import { HandleFriendRequestDto } from './dto/handle-friend-request.dto';
import { JwtAuthGuard } from '@/auth/jwt-auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller("friend-controller")
export class FriendListController {
    constructor(
        @Inject(FriendListService)
        private readonly friendListService: FriendListService
    ) { }

    @Post("send-friend-request")
    async sendFriendRequest( @Req() req: any, @Res() res: any, @Body() body: { receiverNickname: string }) {
        await this.friendListService.sendFriendRequest(req.user.id, body.receiverNickname);

        return res.status(201).send();
    }

    @Get("received-friend-requests")
    async getReceivedFriendRequests(@Req() req: any) {
        return this.friendListService.getReceivedFriendRequests(req.user.id);
    }

    @Get("sended-friend-requests")
    async getSendedFriendRequests(@Req() req: any) {
        return this.friendListService.getSendedFriendRequests(req.user.id);
    }

    @Get("friend-list")
    async getFriendList(@Req() req: any) {
        return this.friendListService.getFriendList(req.user.id);
    }

    @Post("handle-friend-request")
    async handleFriendRequest(@Req() req: any, @Body() handleFriendRequestBody: HandleFriendRequestDto) {
        const { friendId, status } = handleFriendRequestBody;
        return this.friendListService.handleFriendRequest(req.user.id, friendId, status);
    }
}