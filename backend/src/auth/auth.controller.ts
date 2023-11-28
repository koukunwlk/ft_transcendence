import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService }  from './auth.service';
import { FortyTwoAuthGuard } from './42-auth/42.guards';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService){}

    @UseGuards(FortyTwoAuthGuard)
    @Get('login')
    async fortyTwoAuth(@Req() req: any ,@Res() res: any) {
    }

}
