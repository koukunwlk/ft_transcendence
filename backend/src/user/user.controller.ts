import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './service/user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { JwtAuthGuard } from '@/auth/jwt-auth/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUser: CreateUserDTO) {
    return await this.userService.insertUser(createUser);
  }

  @Get()
  async getUsers() {
    const users = await this.userService.getUserList();
    return users.map(user => user.toJson());
  }

  @Get('me')
  async me(@Req() req: any): Promise<string> {
    const user = await this.userService.getUserById(req.user.id);
    return user.toJson();
  }

  @Get(':nickname')
  async getUser(@Param('nickname') nickname: string) {
    return await this.userService.getUserByNickname(nickname);
  }
}
