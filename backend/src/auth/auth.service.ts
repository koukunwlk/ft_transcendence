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
import { User } from '@/user/domain/model/user.model';

@Injectable()
export class AuthService {
  constructor(
    // @Inject(UserService)
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    //    private readonly userRepository: UserRepository,
  ) {}

  async Auth42Redirect(@Req() req: any, @Res() res: Response): Promise<void> {
    const user = await this.userService.loginUser({
      username: req.user.username,
      email: req.user._json.email,
    });

    const accessToken = this.generateJwtToken(user);
    res.cookie('token', accessToken);

    await this.userService.updateUserToken(user.getUsername(), accessToken);

    if (req.user.mfa) {
      res.redirect(process.env.FRONTEND_MFA);
      return;
    }
    return;
  }

  private generateJwtToken(user: User): string {
    console.log(user, `${process.env.NEST_API_JWT_SECRET}`);
    return this.jwtService.sign(
      {
        id: user.id,
        UserName: user.getUsername(),
      },
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
  }
}
