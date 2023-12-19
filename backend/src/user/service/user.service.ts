import {
  Req,
  Res,
  Post,
  BadRequestException,
  Inject,
  Injectable,
  HttpException,
  HttpStatus, } from '@nestjs/common';
import {
  USER_REPOSITORY_TOKEN,
  UserRepository,
} from '../repository/user.repository';
import { User } from '../domain/model/user/user';
import { generateSecret, verify } from '2fa-util';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepository,
  ) {}

  async insertUser( 
    user: User
    ): Promise<string> {
    await this.checkDuplicatedUser(user.getNickname());

    const id = await this.userRepository.insert(user);

    return id;
  }

  
  private async checkDuplicatedUser(nickname: string) {
    const user = await this.userRepository.findOne({ nickname });

     if (user) {
       throw new BadRequestException(`nickname: ${nickname} already exists`);
     }
  }

  async getUser(nickname: string): Promise<any> {
    const user = await this.userRepository.findOne({ nickname });

    return user;
  }
}
