import { Controller, Get, UseGuards } from '@nestjs/common';
import { SettingService } from './setting.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SettingDto } from './dto/setting.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Setting')
@Controller('setting')
export class SettingController {
  constructor(private settingService: SettingService) {}
  @Get()
  @ApiOkResponse({ type: SettingDto })
  findAll() {
    return this.settingService.findAll();
  }
}
