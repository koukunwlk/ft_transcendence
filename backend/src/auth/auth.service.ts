import {
  HttpStatus,
  HttpException,
  Injectable,
  Req,
  Res,
  Inject,
} from '@nestjs/common';
import { UserService } from '../user/service/user.service';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { verify } from '2fa-util';

@Injectable()
export class AuthService {
  constructor(
    // @Inject(UserService)
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    //    private readonly userRepository: UserRepository,
  ) {}

  async Auth42Redirect(@Req() req: any, @Res() res: Response): Promise<void> {
    console.log({
      username: req.user.username,
      email: req.user._json.email,
    });
    const user = await this.userService.loginUser({
      username: req.user.username,
      email: req.user._json.email,
    });
    console.log(user);

    const accessToken = this.generateJwtToken(req.user.id);
    res.cookie('token', accessToken);

    // user.props.token = accessToken;

    // const user = await this.userService.loginUser({
    //     nickname: profile.username,
    //     // token: profile.token,
    //     // validCode: tfaIsActive,
    //     id: profile.id,
    //     email: profile.email,
    //     username: profile.username,
    //     // tfaSecret: secret,
    //   });

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

  async verifyTfaSecret(id: string, code: string): Promise<void> {
    const user = await this.userService.getUser('acosta-a');

    if (!(await verify(code, user.props.tfaSecret))) {
      throw new HttpException('Token is Invalid', HttpStatus.BAD_REQUEST);
    } else {
      console.log('Valid Token');
    }

    const isCodeValid = user.getValidation();
    //    await this.userService.insertUser(user);
  }
}
