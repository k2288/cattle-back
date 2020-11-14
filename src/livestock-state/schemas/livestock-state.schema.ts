import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class LivestockState extends Document {
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
