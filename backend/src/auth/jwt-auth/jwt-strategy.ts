import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '@/user/service/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.NEST_API_JWT_SECRET,
    });
  }

  async validate(payload: any): Promise<any> {
    if (payload == null) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const loggedUser = await this.userService.getUserById(payload.id);

    return loggedUser;
  }
}
