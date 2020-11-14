import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Milk } from '../models/milk';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Livestock extends Document {
  @ApiProperty()
  @Prop()
  tagNo: string;

  @ApiProperty()
  @Prop()
  birthDate: Date;

  @ApiProperty()
  @Prop()
  gender: string;

  @ApiProperty()
  @Prop()
  mother: string;

  @ApiProperty()
  @Prop()
  inseminator: string;

  @ApiProperty()
  @Prop()
  user_id?: string;

  @ApiProperty()
  @Prop()
  state?: string;

  @ApiProperty()
  @Prop()
  lastStateDate?: Date;

  @ApiProperty({ isArray: true, type: Milk })
  @Prop()
  milks?: Milk[];
}

export const LivestockSchema = SchemaFactory.createForClass(Livestock);
