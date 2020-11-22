import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Users')
@Controller('/v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/me')
  async getMe() {
    const user = await this.usersService.currentUser();
    return { phone: user.phone };
  }
}
