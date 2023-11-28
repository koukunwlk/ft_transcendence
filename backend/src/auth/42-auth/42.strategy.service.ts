import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-42';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { config } from 'dotenv';

config();

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
    constructor (private readonly authService: AuthService){
        super({
            clientID: process.env.NEST_API_CLIENT_ID,
            clientSecret: process.env.NEST_API_CLIENT_SECRET,
            callBackUrl: process.env.NEST_API_CLIENT_URL    
        })
    };
    async validate (acessToken: string, refreshToken: string, profile: any, done: any){
        done(null,profile);
    }
}
