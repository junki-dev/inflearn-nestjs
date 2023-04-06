import { Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [],
})

// middleware를 위한 데코레이터가 없어 아래와 같이 등록하면 된다.
export class AppModule implements NestModule {
  configure() {
    mongoose.set('debug', process.env.MODE === 'dev' ? true : false);
  }
}
