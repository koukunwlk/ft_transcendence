import {
  HttpStatus,
  HttpException,
  Injectable,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from '../user/service/user.service';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { generateSecret, verify } from '2fa-util';
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

  async logout(userId: string): Promise<void> {
    return await this.userService.logoutUser(userId);
  }

  private generateJwtToken(user: User): string {
    // console.log(user, `${process.env.NEST_API_JWT_SECRET}`);
    return this.jwtService.sign(
      {
        id: user.id,
        UserName: user.getUsername(),
      },
      { secret: `${process.env.NEST_API_JWT_SECRET}` },
    );
  }

  async generateTfaSecret(userId: string) {
    const user = await this.userService.getUserById(userId);
    const mfaSecret = await generateSecret(user.id, 'Pong');

    await this.userService.updateUserTfaSecret(
      user.getUsername(),
      mfaSecret.secret,
    );

    return {
      secret: mfaSecret.secret,
      qr_code_url: mfaSecret.qrcode,
    };
  }

  async disableTfa(userId: string) {
    const user = await this.userService.getUserById(userId);

    await this.userService.disableUserTfa(
      user.getUsername()
    );

    return true;
  }

  async verifyTfaSecret(userId: string, code: string): Promise<boolean> {
    const user = await this.userService.getUserById(userId);

    if (!verify(code, user.getTfaSecret())) {
      throw new HttpException('Token is Invalid', HttpStatus.BAD_REQUEST);
    }

    await this.userService.updateTfaAuthenticated(userId, true);

    return true;
  }
}
