import { FriendList, User, UserProps } from '../domain/model/user.model';

export abstract class UserRepository {
  abstract findOne(options: Partial<UserProps>): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findAllByIds(ids: string[]): Promise<User[]>;
  abstract insert(user: User): Promise<string>;
}