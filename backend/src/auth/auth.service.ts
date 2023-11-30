import { Injectable } from '@nestjs/common';
import { UserService} from '../user/service/user.service'
@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}
    async login(username: string): Promise<any>{
        const user = await this.userService.getUser(username);

        console.log(user);
        console.log('user');
    }
}
