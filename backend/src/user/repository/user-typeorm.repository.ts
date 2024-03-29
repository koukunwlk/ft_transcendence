import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { User, UserProps } from '../domain/model/user.model';

@Injectable()
export class UserTypeOrmRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOne(options: Partial<UserProps>): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { ...options },
    });

    if (user) {
      return new User(
        {
          username: user.username,
          email: user.email,
          nickname: user.nickname,
          token: user.token,
          status: user.status,
          tfaEnabled: user.tfaEnabled,
          tfaSecret: user.tfaSecret,
        },
        user.id,
      );
    } else {
      return null;
    }
  }

  async insert(user: User): Promise<string> {
    const newUser = this.userRepository.create({
      username: user.getUsername(),
      email: user.getEmail(),
      nickname: user.getNickname() ?? null,
      status: user.getStatus() ?? null,
    });

    const createdUser = await this.userRepository.save(newUser);

    return createdUser.id;
  }

  async findAll(): Promise<User[]> {
    const userEntityList = await this.userRepository.find();
    let userModelList = [];

    if (userEntityList) {
      userEntityList.forEach((user) => {
        userModelList.push(
          new User(
            {
              nickname: user.nickname,
              username: user.username,
              email: user.email,
              status: user.status,
            },
            user.id,
          ),
        );
      });
    }

    return userModelList;
  }

  async remove(user: User): Promise<void> {
    await this.userRepository.delete({ username: user.getUsername() });
  }

  async update(user: User): Promise<void> {
    const updateUser: UserProps = {
      username: user.getUsername(),
      email: user.getEmail(),
      nickname: user.getNickname(),
      token: user.getToken(),
      tfaEnabled: user.getTfaEnabled(),
      tfaSecret: user.getTfaSecret(),
    };

    await this.userRepository.update(user.id, updateUser);
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });

    if (user) {
      return new User(
        {
          username: user.username,
          email: user.email,
          nickname: user.nickname,
          token: user.token,
          status: user.status,
        },
        user.id,
      );
    } else {
      return null;
    }
  }

  async findByNickname(nickname: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { nickname: nickname },
    });

    if (user) {
      return new User(
        {
          username: user.username,
          email: user.email,
          nickname: user.nickname,
          token: user.token,
          status: user.status,
        },
        user.id,
      );
    } else {
      return null;
    }
  }

  async findAllByIds(ids: string[]): Promise<User[]> {
    const userEntityList = await this.userRepository.find({
      where: { id: In(ids) },
    });
    let userModelList = [];

    if (userEntityList) {
      userEntityList.forEach((user) => {
        return new User(
          {
            username: user.username,
            email: user.email,
            nickname: user.nickname,
            token: user.token,
            status: user.status,
          },
          user.id,
        );
      });
    }

    return userModelList;
  }
}
