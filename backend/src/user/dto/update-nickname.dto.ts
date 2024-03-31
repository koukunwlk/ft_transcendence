import { NicknameValidator } from './nickname.validator';
import { IsString, Validate, IsOptional } from 'class-validator';


export class UpdateNicknameDTO {
  @IsString()
  @Validate(NicknameValidator)
  nickname: string;
}