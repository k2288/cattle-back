import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthCode } from './schemas/authcode.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import moment from 'moment';
import { ValidateAuthcodeDto } from './dto/validate-authcode.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthcodeDto } from './dto/create-authcode.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthCode.name) private authModel: Model<AuthCode>,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async generateCode(createUserDto: CreateUserDto) {
    let user = await this.userService.findOneByPhone(createUserDto.phone);

    if (!user) {
      user = await this.userService.create(createUserDto);
    }
    const code = Math.round(Math.random() * (999999 - 111111) + 111111);

    const createAuthCodeDto = new CreateAuthcodeDto(
      user._id,
      code.toString(),
      moment().add(5, 'm').toDate(),
    );
    const authCode = new this.authModel(createAuthCodeDto);
    await authCode.save();
    return user;
  }

  async login(validateAuthCodeDto: ValidateAuthcodeDto) {

    const authCode = await this.authModel.findOne({
      code: validateAuthCodeDto.code,
    });
    if (!authCode) throw new BadRequestException();
    const user = await this.userService.findOne(authCode.user_id);
    if (!user) throw new BadRequestException();
    if (user.phone !== validateAuthCodeDto.phone)
      throw new BadRequestException();

    const token = this.jwtService.sign({ user_id: user.id });

    return { token: token };
  }
}
