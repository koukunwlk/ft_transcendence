import { IsEnum, IsBoolean, IsString, Validate, IsOptional } from 'class-validator';
import { NicknameValidator } from './nickname.validator';
import { UserStatusEnum } from '../domain/model/user.model';

export class CreateUserDTO {
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  @Validate(NicknameValidator)
  nickname?: string;

  @IsString()
  email: string;

  @IsOptional()
  @IsEnum(UserStatusEnum)
  status?: UserStatusEnum;

  @IsOptional()
  @IsString()
  token?: string;

  // @IsBoolean()
  // validCode: boolean;

  // @IsString()
  // userId: string;

  // @IsString()
  // tfaSecret: string;
}
