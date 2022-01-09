import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { TSessionData } from 'src/common/session-data';
import { CreateUserDto } from './dto/user-create.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getUser(@Session() session: Record<string, any>) {
    return session.user;
  }

  @Post()
  async createUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body() data: CreateUserDto,
    @Session() session: TSessionData,
  ) {
    if (!data.name) {
      throw new BadRequestException('이름을 입력해주세요.');
    }
    data.ip = req.ip;
    const ret = await this.userService.createUser(data);

    session.user._id = ret._id;
    session.user.name = ret.name;
    session.user.ip = ret.ip;
    return res.json(ret);
  }
}
