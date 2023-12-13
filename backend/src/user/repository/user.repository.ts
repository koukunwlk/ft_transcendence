import { User, UserProps } from '../domain/model/user/user';

export abstract class UserRepository {
  abstract findOne(options: Partial<UserProps>): Promise<User>;
  abstract insert(user: User): Promise<string>;
}
export const USER_REPOSITORY_TOKEN = Symbol('USER_REPOSITORY_TOKEN');
