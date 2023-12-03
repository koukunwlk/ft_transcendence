import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserProps } from '../domain/model/user/user';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserTypeOrmRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOne(options: Partial<UserProps>): Promise<User> {
    const userEntity = await this.userRepository.findOne({
      where: { nickname: options.nickname },
    });
    return new User(userEntity);
  }

  async insert(user: User): Promise<string> {
    const newUser = this.userRepository.create({
      nickname: user.getNickname(),
    });
    const createdUser = await this.userRepository.save(newUser);
    return createdUser.nickname;
  }
}
