import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop()
  userId: string;

  @Prop()
  name: string;

  @Prop()
  ip: string;

  @Prop()
  topic: string;

  @Prop()
  message: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
