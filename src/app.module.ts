import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { HeaderResolver, I18nJsonParser, I18nModule } from 'nestjs-i18n';
import { LivestockModule } from './livestock/livestock.module';
import { LivestockStateModule } from './livestock-state/livestock-state.module';
import path from 'path';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`,
      { useNewUrlParser: true },
    ),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, '/i18n/'),
      },
      resolvers: [new HeaderResolver(['x-custom-lang'])],
    }),
    LivestockModule,
    LivestockStateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
