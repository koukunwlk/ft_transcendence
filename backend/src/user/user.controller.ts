import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './service/user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './domain/model/user/user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
}
