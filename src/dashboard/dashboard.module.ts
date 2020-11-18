import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { LivestockModule } from '../livestock/livestock.module';

@Module({
  imports: [LivestockModule],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
