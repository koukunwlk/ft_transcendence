import { ClassProvider } from "@nestjs/common";
import { FriendListRepository } from "./friend-list.respository";
import { FriendRequestTypeormRepository } from "./friend-request-typeorm.respository";

export const friendListRepositoryProvider: ClassProvider = {
    useClass: FriendRequestTypeormRepository,
    provide: FriendListRepository,
}