import { Injectable } from '@nestjs/common';
import Strategy = require('passport-42');
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { config } from 'dotenv';
import { UserService } from '../../user/service/user.service';
import { generateSecret } from '2fa-util';
import { User } from '@/user/domain/model/user.model';

config({ path: '../.env' });

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

    done(null, profile);
  }
}
