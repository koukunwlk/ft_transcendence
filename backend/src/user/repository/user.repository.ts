import { User, UserProps } from '../domain/model/user/user';

export abstract class UserRepository {
  findOne(options: Partial<UserProps>): Promise<User>;
}
