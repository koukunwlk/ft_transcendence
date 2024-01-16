import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY_TOKEN,
  UserRepository,
} from '../repository/user.repository';
import { FriendList, User } from '../domain/model/user/user';
import { CreateUserDTO } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepository,
  ) {}

  async insertUser(createUser: CreateUserDTO): Promise<string> {
    await this.checkDuplicatedUser(createUser.nickname);

    const user = new User(createUser);
    const id = await this.userRepository.insert(user);

    return id;
  }

  async getUserList(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async getUser(id: string): Promise<User> {
    return await this.userRepository.findOne({ nickname: id });
  }

  async getFriendList(ownerId: string): Promise<FriendList[]> {
    return await this.userRepository.getFriendList(ownerId);
  }

  async addFriend(ownerNickname: string, friendName: string): Promise<void> {
    const friendUser = await this.getUser(friendName);
    const ownerUser = await this.getUser(ownerNickname);

    const isFriend = await this.checkIfFriendIsInFriendList(ownerUser.id, friendUser);

    if (isFriend) {
      return;
    }

    return await this.userRepository.insertFriend(ownerUser.id, friendUser.id);
  }

  private async checkIfFriendIsInFriendList(ownerId: string, friendUser: User) {
    const friendList = await this.getFriendList(ownerId);
    if (friendList.includes(friendUser)) {
      return true;
    }
    return false;
  }

  private async checkDuplicatedUser(nickname: string) {
    const user = await this.userRepository.findOne({ nickname });

    if (user) {
      throw new BadRequestException(`nickname: ${nickname} already exists`);
    }
  }
}
