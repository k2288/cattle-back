import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ValidateAuthcodeDto } from './dto/validate-authcode.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login-response.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/phone')
  async create(@Body() createUserDto: CreateUserDto) {
    await this.authService.generateCode(createUserDto);
    return {};
  }

  @Post('/code')
  @ApiOkResponse({
    type: LoginResponseDto,
  })
  async validateAuthCode(
    @Body() validateAuthcodeDto: ValidateAuthcodeDto,
  ): Promise<LoginResponseDto> {
    return await this.authService.login(validateAuthcodeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async testAuth() {
    return 'hello';
  }
}
