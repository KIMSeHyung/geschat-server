import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TSessionUser } from 'src/common/session-data';
import { SendMessageDto } from './dto/chat.dto';
import { Chat, ChatDocument } from './schema/chat.schema';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}

  async getMessages(topic: string): Promise<Chat[]> {
    return await this.chatModel.find({ topic });
  }

  async sendMessage(data: SendMessageDto, user: TSessionUser) {
    try {
      const message = new this.chatModel();
      message.userId = user._id;
      message.name = user.name;
      message.ip = user.ip;
      message.topic = data.topic;
      message.message = data.message;
      return await message.save();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
