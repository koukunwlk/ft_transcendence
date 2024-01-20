import { IsString, Validate } from 'class-validator';
import { NicknameValidator } from './nickname.validator';

export class CreateUserDTO {
  @IsString()
  @Validate(NicknameValidator)
  nickname: string;
}
