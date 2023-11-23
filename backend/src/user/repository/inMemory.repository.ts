import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { User, UserProps } from "../domain/model/user/user";

@Injectable()
export class InMemory implements UserRepository {
  private users: User[];

  constructor() { }

  findOne(options: Partial<UserProps>): Promise<User> {
    const user = this.users.find(user => {
      if (user.getNickname() === options.nickname) {
        return user;
      }
    });
    return Promise.resolve(user);
  }

  insert(user: User): Promise<string> {
    this.users.push(user);

    return Promise.resolve(user.id);
  }
}