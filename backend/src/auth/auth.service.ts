import {
  HttpStatus,
  HttpException,
  Injectable,
  Req,
  Res,
  Inject
} from '@nestjs/common';
import { UserService } from '../user/service/user.service';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

import {  USER_REPOSITORY_TOKEN, UserRepository } from '../user/repository/user.repository';
import { User } from '../user/domain/model/user/user';
import { generateSecret, verify } from '2fa-util';
import { UsingJoinColumnIsNotAllowedError } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepository,
  ) {}
  //   async login(username: string): Promise<any>{
  //       const user = await this.userService.getUser(username);
  //   }
  async Auth42Redirect(@Req() req: any, @Res() res: Response): Promise<void> {
    const user = await this.userService.getUser(req.user.username);
    const accessToken: string = this.generateJwtToken(req.user.id);
    res.cookie('token', accessToken);
    user.props.token = accessToken;
    if (req.user.mfa) {
      res.redirect(process.env.FRONTEND_MFA);
      return;
    }
    return;
  }
  private generateJwtToken(UserId: any): string {
    console.log(UserId, `${process.env.NEST_API_JWT_SECRET}`);
    return this.jwtService.sign(
      { req: UserId },
      { secret: `${process.env.NEST_API_JWT_SECRET}` },
    );
  }

  async generateTfaSecret(UserId: string) {
    const user = await this.userService.getUser('acosta-a');
    const mfaSecret = await generateSecret(user.props.userId, 'Pong');
    user.setTfaSecret(mfaSecret.secret);
    console.log(user)
    console.log(mfaSecret)
    return {
      secret: mfaSecret.secret,
      qr_code_url: mfaSecret.qrcode, //não estou utilizando
    };
  }

  async verifyTfaSecret(id: string, code: string): Promise<void> {
    const user = await this.userService.getUser('acosta-a');
    console.log('tfa secret: ', user);
    if (!(await verify(code, user.props.tfaSecret))) {
      throw new HttpException('Token is Invalid', HttpStatus.BAD_REQUEST);
    } else console.log('Valid Token');
    const isCodeValid = user.getValidation();
    await this.userRepository.insert(user);
  }
}
