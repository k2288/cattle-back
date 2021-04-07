import { Injectable } from '@nestjs/common';
import { SettingDto } from './dto/setting.dto';
import { dashboardConst } from '../dashboard/dashboard.const';

@Injectable()
export class SettingService {
  findAll() {
    return new SettingDto(
      [
        { name: dashboardConst.MILKED, title: { fa: 'شیرخوار', en: 'Milked' } },
        {
          name: dashboardConst.HEIFER,
          title: { fa: 'تلیسه', en: 'Heifer' },
        },
        {
          name: dashboardConst.INSEMINATION,
          title: { fa: 'تلقیح', en: 'Insemination' },
        },
        {
          name: dashboardConst.ABORTION,
          title: { fa: 'سقط', en: 'Abortion' },
        },
        { name: dashboardConst.DRY, title: { fa: 'خشک', en: 'Dry' } },
        {
          name: dashboardConst.CALVED,
          title: { fa: 'زایش', en: 'Calved' },
        },
        {
          name: dashboardConst.EVENT,
          title: { fa: 'رویداد', en: 'Event' },
        },
      ],
      [
        { name: dashboardConst.BULL, title: { fa: 'نر', en: 'Bull' } },
        { name: dashboardConst.COW, title: { fa: 'ماده', en: 'Cow' } },
      ],
    );
  }
}
