import { ClassProvider } from "@nestjs/common";
import { FriendListRepository } from "./friend-list.respository";
import { FriendListTypeormRepository } from "./friend-list-typeorm.repository";

export const friendListRepositoryProvider: ClassProvider = {
    useClass: FriendListTypeormRepository,
    provide: FriendListRepository,
}