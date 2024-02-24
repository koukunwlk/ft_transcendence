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
  ) { }

  async findOne(options: Partial<UserProps>): Promise<User> {
    const userEntity = await this.userRepository.findOne({
      where: { nickname: options.nickname },
    });

    if (userEntity) {
      return new User({
        nickname: userEntity.nickname,
      });
    } else {
      return null;
    }
  }

  async insert(user: User): Promise<string> {
    const newUser = this.userRepository.create({
      nickname: user.getNickname(),
    });
    const createdUser = await this.userRepository.save(newUser);
    return createdUser.nickname;
  }

  async findAll(): Promise<User[]> {
    const userEntityList = await this.userRepository.find();
    let userModelList = [];

    if (userEntityList) {
      userEntityList.forEach((user) => {
        userModelList.push(new User({
          nickname: user.nickname,
        }));
      });
    }

    return userModelList;
  }

  async remove(user: User): Promise<void> {
    await this.userRepository.delete({ nickname: user.getNickname() });
  }

  async update(user: User): Promise<void> {
    await this.userRepository.update(
      { nickname: user.getNickname() },
      { nickname: user.getNickname() },
    );
  }

  async findById(id: string): Promise<User> {
    const userEntity = await this.userRepository.findOne({
      where: { id: id },
    });

    if (userEntity) {
      return new User({
        nickname: userEntity.nickname,
      });
    } else {
      return null;
    }
  }

  async findByNickname(nickname: string): Promise<User> {
    const userEntity = await this.userRepository.findOne({
      where: { nickname: nickname },
    });

    if (userEntity) {
      return new User({
        nickname: userEntity.nickname,
      });
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
        userModelList.push(new User({
          nickname: user.nickname,
        }));
      });
    }

    return userModelList;
  }

}
