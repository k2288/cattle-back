import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthCode, AuthcodeSchema } from './schemas/authcode.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.startegy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    MongooseModule.forFeature([
      { name: AuthCode.name, schema: AuthcodeSchema },
    ]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.jwtPrivateKey,
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
