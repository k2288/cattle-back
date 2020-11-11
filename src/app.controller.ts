import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { I18n, I18nContext } from 'nestjs-i18n';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@I18n() i18n: I18nContext) {
    return await i18n.translate('lang.HELLO');
  }
}
