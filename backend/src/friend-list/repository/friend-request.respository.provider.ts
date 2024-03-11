import { ClassProvider } from "@nestjs/common";
import { FriendRequestRepository } from "./friend-request.repository";
import { FriendRequestTypeormRepository } from "./friend-request-typeorm.respository";

export const friendRequestRepositoryProvider: ClassProvider = {
    useClass: FriendRequestTypeormRepository,
    provide: FriendRequestRepository,
}