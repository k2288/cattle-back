import { Injectable } from '@nestjs/common';
import { SettingDto } from './dto/setting.dto';
import { dashboardConst } from '../dashboard/dashboard.const';

@Injectable()
export class SettingService {
  findAll() {
    return new SettingDto(
      [
        dashboardConst.MILKED,
        dashboardConst.HEIFER,
        dashboardConst.INSEMINATION,
        dashboardConst.ABORTION,
        dashboardConst.DRY,
        dashboardConst.CALVED,
        dashboardConst.EVENT,
      ],
      [dashboardConst.BULL, dashboardConst.COW],
    );
  }
}
