import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { FriendList, User, UserProps } from '../domain/model/user.model';

@Injectable()
export class InMemory implements UserRepository {
  private users: User[];

  private friendList: { ownerId: string; friendId: string }[];

  constructor() {
    this.users = [];
  }

  findOne(options: Partial<UserProps>): Promise<User> {
    const user = this.users.find((user) => {
      if (user.getNickname() === options.nickname) {
        return user;
      }
    });
    return Promise.resolve(user);
  }

  findAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  insert(user: User): Promise<string> {
    this.users.push(user);

    return Promise.resolve(user.id);
  }

  getFriendList(ownerId: string): Promise<FriendList[]> {
    const populatedFriendList: FriendList[] = this.users.filter((user) =>
      this.friendList.includes({ ownerId, friendId: user.id }),
    );

    return Promise.resolve(populatedFriendList);
  }

  getSize(): number {
    return this.users.length;
  }
}
