import {
  Post,
  Body,
  Patch,
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { FortyTwoAuthGuard } from './42-auth/42.guards';
import { JwtAuthGuard } from './jwt-auth/jwt-auth.guard';
import { Response } from 'express';
import { UserService } from '../user/service/user.service';
import { config } from 'dotenv';

config({ path: '../../../.env' });

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Get('42/callback')
  @UseGuards(FortyTwoAuthGuard)
  async fortyTwoRedirect(@Req() req: any, @Res() res: Response): Promise<void> {
    await this.authService.Auth42Redirect(req, res);
    console.log(res.getHeaders());
    return res.redirect(`${process.env.HOST_FRONT}`);
  }

  @Get('logout')
  async logout(@Req() req: any, @Res() res: Response): Promise<void> {
    res.clearCookie('token');
    res.status(200).send({ message: 'Logout sucessful' });
    return res.redirect(process.env.HOST_FRONT);
  }

  @Post('verify-2fa')
  async verifyTfaSecret(@Req() req, @Body() body): Promise<void> {
    return this.authService.verifyTfaSecret(
      await this.userService.getUser('acosta-a'),
      body.code,
    );
  }
}
