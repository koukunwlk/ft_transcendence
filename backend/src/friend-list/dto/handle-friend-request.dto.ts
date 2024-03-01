import { IsEnum, IsNotEmpty } from "class-validator";
import { FriendListStatusEnum } from "../domain/model/friend-list.model";

export class HandleFriendRequestDto {
    @IsNotEmpty()
    friendId: string;

    @IsNotEmpty()
    @IsEnum(FriendListStatusEnum)
    status: FriendListStatusEnum;
}