import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ValidateAuthcodeDto } from './dto/validate-authcode.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login-response.dto';

@ApiTags('auth')
@Controller('/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.authService.generateCode(createUserDto);
    return {};
  }

  @Post('/code')
  @ApiOkResponse({
    type: LoginResponseDto,
  })
  async validateAuthCode(@Body() validateAuthcodeDto: ValidateAuthcodeDto) {
    return await this.authService.login(validateAuthcodeDto);
  }
}
