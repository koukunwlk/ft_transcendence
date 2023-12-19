import { IsBoolean, IsString, Validate } from 'class-validator';
import { NicknameValidator } from './nickname.validator';

export class CreateUserDTO {
  @IsString()
  @Validate(NicknameValidator)
  nickname: string;

  @IsString()
  token: string;

  @IsBoolean()
  validCode: boolean;

  @IsString()
  userId: string;

  @IsBoolean()
  email: boolean;

  @IsString()
  username: string;

  @IsString()
  tfaSecret: string;
}
