import { MessageRoom, MessageSchema } from './schema/message.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { MessagesController } from './messages.controller';
import { UserSchema } from '../user/user.schema';
import {ChatMiddleware} from "./chat.middleware";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MessageRoom.name, schema: MessageSchema },
    ]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [MessagesGateway, MessagesService],
  controllers: [MessagesController],
  exports: [MessagesGateway, MessagesService],
})
export class MessagesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ChatMiddleware).forRoutes('chats/:user_id');
  }
}
