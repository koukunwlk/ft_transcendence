import {
  Req,
  Res,
  Post,
  BadRequestException,
  Inject,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { User } from '../domain/model/user.model';
import { CreateUserDTO } from '../dto/create-user.dto';
import { generateSecret, verify } from '2fa-util';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async insertUser(createUser: CreateUserDTO): Promise<string> {
    // await this.checkDuplicatedUser(createUser.nickname);

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

  async getUser(username: string): Promise<any> {
    const user = await this.userRepository.findOne({ username });

    return user;
  }

  async addFriend(nickname: string, friendName: string): Promise<any> {
    const user = await this.userRepository.findOne({ nickname });
    const friend = await this.userRepository.findOne({ nickname: friendName });

    return [user, friend];
  }

  async loginUser(loggedUser: CreateUserDTO): Promise<User> {
    let user = await this.userRepository.findOne({
      username: loggedUser.username,
    });

    if (!user) {
      const createdId = await this.insertUser(loggedUser);
      console.log('Criado usuário com ID: ', createdId);

      user = await this.userRepository.findOne({
        id: createdId,
      });
    }

    return user;
  }

  async updateUserToken(username: string, token: string): Promise<void> {
    let user = await this.userRepository.findOne({
      username,
    });

    if (!user) {
      throw new HttpException('Invalid username', HttpStatus.BAD_REQUEST);
    }

    user.setToken(token);
    return await this.userRepository.update(user);
  }
}
