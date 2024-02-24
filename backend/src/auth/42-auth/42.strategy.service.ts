import { Injectable } from '@nestjs/common';
import Strategy = require('passport-42');
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { config } from 'dotenv';
import { UserService } from '../../user/service/user.service';
import { generateSecret } from '2fa-util';
import { User } from '@/user/domain/model/user.model';

config();

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: process.env.NEST_API_CLIENT_ID,
      clientSecret: process.env.NEST_API_CLIENT_SECRET,
      callbackURL: process.env.NEST_API_CLIENT_URL,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) {
    const mfaSecret = await generateSecret(profile.id, 'Pong');
    const secret = mfaSecret.secret;
    const tfaIsActive = false;

    // const user = new User({
    //   nickname: profile.username,
    //   // token: profile.token,
    //   // validCode: tfaIsActive,
    //   id: profile.id,
    //   email: profile.email,
    //   username: profile.username,
    //   // tfaSecret: secret,
    // });

    // await this.userService.insertUser({
    //   nickname: profile.username,
    //   // token: profile.token,
    //   // validCode: tfaIsActive,
    //   id: profile.id,
    //   email: profile.email,
    //   username: profile.username,
    //   // tfaSecret: secret,
    // });

    // console.log(this.userService.getUser('acosta-a'));
    // console.log(await this.userService.loginUser(profile.id));
    done(null, profile);
  }
}
