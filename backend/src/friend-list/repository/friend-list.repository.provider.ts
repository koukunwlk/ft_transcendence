import { ClassProvider } from "@nestjs/common";
import { FriendListInMemoryRepostiory } from "./friend-list-in-memory.repository";
import { FriendListRepository } from "./friend-list.respository";

export const friendListRepositoryProvider: ClassProvider = {
    useClass: FriendListInMemoryRepostiory,
    provide: FriendListRepository,
}