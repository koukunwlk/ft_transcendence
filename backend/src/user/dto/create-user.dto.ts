import { IsEnum, IsString, Validate } from 'class-validator';
import { NicknameValidator } from './nickname.validator';
import { UserStatusEnum } from '../domain/model/user.model';

export class CreateUserDTO {
  @IsString()
  @Validate(NicknameValidator)
  nickname: string;

  @IsEnum(UserStatusEnum)
  status: UserStatusEnum
}
