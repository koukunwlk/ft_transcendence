import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './service/user.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUser: CreateUserDTO) {
    return await this.userService.insertUser(createUser.nickname);
  }
}
