import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UserService } from './service/user.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUser: CreateUserDTO) {
    return await this.userService.insertUser(createUser);
  }

  @Get()
  async getUsers() {
    return await this.userService.getUserList();
  }

  @Get(':nickname')
  async getUser(@Param('nickname') nickname: string) {
    return await this.userService.getUser(nickname);
  }

  @Post(':nickname')
  async addFriend(@Param('nickname') nickname: string, @Body() friendName: string) {
    console.log(nickname, friendName);
    return await this.userService.addFriend(nickname, friendName);
  }

  
}
