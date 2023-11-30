import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService }  from './auth.service';
import { FortyTwoAuthGuard } from './42-auth/42.guards';

@Controller('auth')
export class AuthController {
    constructor (private AuthService: AuthService){}

    @UseGuards(FortyTwoAuthGuard)
    @Get('login')
    async fortyTwoAuth(@Req() req: any ,@Res() res: any) {
    }

    @Get('42/callback')
    @UseGuards(FortyTwoAuthGuard)
    async fortyTwoRedirect(@Req() req: any, @Res({ passthrough: true }) res:any){
        console.log(req.user)
        console.log('teste')
        if(!req.user) return res.redirect(`${process.env.HOST_FRONT}/`);
        const {username, name, _json} = req.user;
        return res.redirect(`${'www.foi.com.br'}/`);
    }

}
