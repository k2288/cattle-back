import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type LivestockStateDocument = HydratedDocument<LivestockState>;

@Schema({ timestamps: true })
export class LivestockState {
  @ApiProperty()
  @Prop()
  state: string;

  @ApiProperty()
  @Prop()
  date: Date;

  @ApiProperty()
  @Prop()
  description: string;

  @ApiProperty()
  @Prop()
  livestock_id: string;
}

export const LivestockStateSchema = SchemaFactory.createForClass(
  LivestockState,
);
