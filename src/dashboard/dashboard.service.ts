import { Injectable } from '@nestjs/common';
import { LivestockService } from '../livestock/livestock.service';
import { dashboardConst } from './dashboard.const';
import { Dashboard } from './models/dashboard';

@Injectable()
export class DashboardService {
  constructor(private livestockService: LivestockService) {}

  async getAll() {
    return new Dashboard(
      await this.livestockService.getStateCount(dashboardConst.TOTAL),
      await this.livestockService.getStateCount(dashboardConst.DRY),
      await this.livestockService.getStateCount(dashboardConst.CALVED),
      await this.livestockService.getStateCount(dashboardConst.INSEMINATION),
      await this.livestockService.getStateCount(dashboardConst.MILKED),
      await this.livestockService.getStateCount(dashboardConst.HEIFER),
      await this.livestockService.getStateCount(dashboardConst.ABORTION),
      await this.livestockService.getGenderCount(dashboardConst.BULL),
      await this.livestockService.getGenderCount(dashboardConst.COW),
    );
  }
}
