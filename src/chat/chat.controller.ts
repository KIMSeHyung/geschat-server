import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Session,
} from '@nestjs/common';
import { TSessionData } from 'src/common/session-data';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get(':topic')
  async getMessages(@Param('topic') topic: string) {
    return await this.chatService.getMessages(topic);
  }

  @Post()
  async sendMessage(
    @Body() data: SendMessageDto,
    @Session() session: TSessionData,
  ) {
    if (!data.message) {
      throw new BadRequestException('메세지가 없습니다.');
    }
    if (!session.user || !data.topic) {
      throw new BadRequestException('잘못된 요청입니다.');
    }
    return await this.chatService.sendMessage(data, session.user);
  }
}
