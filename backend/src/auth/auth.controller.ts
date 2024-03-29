import {
  Post,
  Body,
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { FortyTwoAuthGuard } from './42-auth/42.guards';
import { JwtAuthGuard } from './jwt-auth/jwt-auth.guard';
import { Response } from 'express';
import { config } from 'dotenv';

config({ path: '../../../.env' });

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Get('42/callback')
  @UseGuards(FortyTwoAuthGuard)
  async fortyTwoRedirect(@Req() req: any, @Res() res: Response): Promise<void> {
    await this.authService.Auth42Redirect(req, res);
    return res.redirect(`${process.env.HOST_FRONT}`);
  }

  @Get('logout')
  async logout(@Req() req: any, @Res() res: Response): Promise<void> {
    res.clearCookie('token');
    res.status(200).send({ message: 'Logout sucessful' });
    return res.redirect(process.env.HOST_FRONT);
  }

  @Post('generate-2fa')
  @UseGuards(JwtAuthGuard)
  async generateTfaSecret(@Req() req) {
    return await this.authService.generateTfaSecret(req.user.id);
  }

  @Post('verify-2fa')
  @UseGuards(JwtAuthGuard)
  async verifyTfaSecret(
    @Req() req,
    @Res() res: Response,
    @Body() body,
  ): Promise<Response> {
    try {
      await this.authService.verifyTfaSecret(req.user.id, body.code);

      return res.status(200).send();
    } catch (error) {
      return res.status(error.status).send(error.response);
    }
  }
}
