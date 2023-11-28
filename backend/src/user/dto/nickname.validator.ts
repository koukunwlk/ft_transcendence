import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'nicknameValidator', async: false })
export class NicknameValidator implements ValidatorConstraintInterface {
  validate(nickname: string) {
    return !nickname.includes(' ');
  }

  defaultMessage(): string {
    return 'O Nickname não pode conter espaço.';
  }
}
