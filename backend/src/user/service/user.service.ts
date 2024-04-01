import {
  BadRequestException,
  Inject,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { User, UserStatusEnum } from '../domain/model/user.model';
import { CreateUserDTO } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) { }

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
    const user = await this.userRepository.findOne({ nickname });

    if (!user) {
      throw new BadRequestException("User doesn't exist");
    }

    return user;
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

  async logoutUser(id: string) {
    let user = await this.userRepository.findOne({
      id,
    });

    if (!user) {
      throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST);
    }

    return await this.updateTfaAuthenticated(id, false);
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

  async updateUserTfaSecret(
    username: string,
    tfaSecret: string,
  ): Promise<void> {
    let user = await this.userRepository.findOne({
      username,
    });

    if (!user) {
      throw new HttpException('Invalid username', HttpStatus.BAD_REQUEST);
    }

    user.setTfaSecret(tfaSecret);
    user.setTfaEnabled(true);
    return await this.userRepository.update(user);
  }

  async disableUserTfa(
    username: string,
  ): Promise<void> {
    let user = await this.userRepository.findOne({
      username,
    });

    if (!user) {
      throw new HttpException('Invalid username', HttpStatus.BAD_REQUEST);
    }

    user.setTfaSecret(null);
    user.setTfaEnabled(false);
    return await this.userRepository.update(user);
  }

  async updateTfaAuthenticated(
    id: string,
    tfaAuthenticated: boolean,
  ): Promise<void> {
    let user = await this.userRepository.findOne({
      id,
    });

    if (!user) {
      throw new HttpException('Invalid username', HttpStatus.BAD_REQUEST);
    }

    user.setTfaAuthenticated(tfaAuthenticated);
    return await this.userRepository.update(user);
  }

  async updateStatus(id: string, status: UserStatusEnum): Promise<void> {
    let user = await this.userRepository.findOne({
      id,
    });

    if (!user) {
      throw new HttpException('Invalid user id', HttpStatus.BAD_REQUEST);
    }
    user.setStatus(status);
    return await this.userRepository.update(user);
  }

  async updateNickname(id: string, nickname: string): Promise<void> {
    let user = await this.userRepository.findOne({
      id,
    });

    if (!user) {
      throw new HttpException('Invalid user id', HttpStatus.BAD_REQUEST);
    }


    let nicknameOwner = await this.userRepository.findOne({
      nickname,
    });

    if (nicknameOwner) {
      throw new HttpException('Nickname in use', HttpStatus.BAD_REQUEST);
    }

    user.setNickname(nickname);
    return await this.userRepository.update(user);
  }

  async updateAvatar(id: string, avatar: Buffer): Promise<void> {
    let user = await this.userRepository.findOne({
      id,
    });

    if (!user) {
      throw new HttpException('Invalid user id', HttpStatus.BAD_REQUEST);
    }

    user.setAvatar(avatar);
    return await this.userRepository.update(user);
  }

  async updateScore(userid: string, newScore: number): Promise<void> {
    let user = await this.userRepository.findOne({
      id: userid,
    });
    console.log(user.toJson())
    user.setScore(user.getScore() + newScore)
    console.log(user.getScore())
    this.userRepository.update(user)
  }
  async getRanking() {
    const ranking = await this.userRepository.getRanking();
    const mappedRanking = ranking.map((user) => user.toScore());
    return mappedRanking;
  }

}
