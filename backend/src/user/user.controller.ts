import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Req,
  Patch,
  HttpException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './service/user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { JwtAuthGuard } from '@/auth/jwt-auth/jwt-auth.guard';
import { UserStatusEnum } from './domain/model/user.model';
import { UpdateNicknameDTO } from './dto/update-nickname.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUser: CreateUserDTO) {
    return await this.userService.insertUser(createUser);
  }

  @Get('rankings')
  async getRanking() {
      console.log("controller ranking")
      return await this.userService.getRanking();
  }

  @Get('list')
  async getUsers() {
    try {
      const users = await this.userService.getUserList();
      return users.map((user) => user.toJson());
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Get('me')
  async me(@Req() req: any): Promise<string> {
    try {
      const user = await this.userService.getUserById(req.user.id);
      const ranking = await this.userService.getRanking();
      user.setRanking(ranking.findIndex((u) => u.id === user.id) + 1);
      return user.toJson();
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Patch("status")
  async updateStatus(@Req() req: any, @Body() body: { status: UserStatusEnum }) {
    return await this.userService.updateStatus(req.user.id, body.status);
  }

  @Patch("avatar")
  @UseInterceptors(FileInterceptor('image'))
  async updateAvatar(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
    return await this.userService.updateAvatar(req.user.id, file.buffer);
  }

  @Patch("nickname")
  async updateNickname(@Req() req: any, @Body() body: UpdateNicknameDTO) {
    return await this.userService.updateNickname(req.user.id, body.nickname);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    console.log(id)
    try {
      const user = await this.userService.getUserById(id);
      const ranking = await this.userService.getRanking();
      console.log(user.getStatus())
      if(user.getStatus() === UserStatusEnum.INVISIBLE) {
        user.setStatus(UserStatusEnum.OFFLINE);
        console.log(user.getStatus())
      }
      user.setRanking(ranking.findIndex((u) => u.id === user.id) + 1);
      return user.toFriendList();
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Get(':nickname')
  async getUser(@Param('nickname') nickname: string) {
    try {
      return await this.userService.getUserByNickname(nickname);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }


}
