import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class AuthCode extends Document {
  @Prop()
  code: string;

  @Prop()
  expireDateTime: Date;

  @Prop({ type: Types.ObjectId })
  user_id: Types.ObjectId;
}

export const AuthcodeSchema = SchemaFactory.createForClass(AuthCode);
