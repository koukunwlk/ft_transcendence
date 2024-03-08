import { Module } from "@nestjs/common";
import { friendListRepositoryProvider } from "./repository/friend-list.repository.provider";
import { UserModule } from "@/user/user.module";
import { FriendListService } from "./service/friend-list.service";
import { FriendListController } from "./friend-list.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FriendListTypeormEntity } from "./repository/entities/friend-list-typeorm.entity";
import { friendRequestRepositoryProvider } from "./repository/friend-request.respository.provider";
import { FriendRequestTypeormEntity } from "./repository/entities/friend-request-typeorm.entity";

@Module({
    imports: [UserModule, TypeOrmModule.forFeature([FriendListTypeormEntity, FriendRequestTypeormEntity])],
    controllers: [FriendListController],
    providers: [friendListRepositoryProvider, friendRequestRepositoryProvider, FriendListService],
    exports: []
})
export class FriendListModule { }