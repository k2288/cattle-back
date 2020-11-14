import { Module } from '@nestjs/common';
import { LivestockService } from './livestock.service';
import { LivestockController } from './livestock.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Livestock, LivestockSchema } from './schemas/livestock.schema';
import { LivestockStateModule } from '../livestock-state/livestock-state.module';

@Module({
  imports: [
    LivestockStateModule,
    MongooseModule.forFeature([
      { name: Livestock.name, schema: LivestockSchema },
    ]),
  ],
  controllers: [LivestockController],
  providers: [LivestockService],
})
export class LivestockModule {}
