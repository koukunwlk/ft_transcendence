import { Module } from "@nestjs/common";
import { friendListRepositoryProvider } from "./repository/friend-list.repository.provider";
import { UserModule } from "@/user/user.module";

@Module({
    imports: [UserModule],
    controllers: [],
    providers: [friendListRepositoryProvider],
    exports: []
})
export class FriendListModule { }