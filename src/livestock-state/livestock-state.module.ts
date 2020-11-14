import { Module } from '@nestjs/common';
import { LivestockStateService } from './livestock-state.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LivestockState,
  LivestockStateSchema,
} from './schemas/livestock-state.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LivestockState.name, schema: LivestockStateSchema },
    ]),
  ],
  providers: [LivestockStateService],
  exports: [LivestockStateService],
})
export class LivestockStateModule {}
