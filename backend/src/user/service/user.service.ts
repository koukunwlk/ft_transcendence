import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  UserRepository,
} from '../repository/user.repository';
import { User } from '../domain/model/user.model';
import { CreateUserDTO } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) { }

  async insertUser(createUser: CreateUserDTO): Promise<string> {
    await this.checkDuplicatedUser(createUser.nickname);

    const user = new User(createUser);
    const id = await this.userRepository.insert(user);

    return id;
  }

  async getUserList(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async getUserByNickname(nickname: string): Promise<User> {
    return await this.userRepository.findOne({ nickname });
  }

  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOne({ id });
  }

  async getUsersByIds(ids: string[]): Promise<User[]> {
    return await this.userRepository.findAllByIds(ids);
  }

  private async checkDuplicatedUser(nickname: string) {
    const user = await this.userRepository.findOne({ nickname });

    if (user) {
      throw new BadRequestException(`nickname: ${nickname} already exists`);
    }
  }
}
