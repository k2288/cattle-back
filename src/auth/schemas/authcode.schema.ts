import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AuthCodeDocument = HydratedDocument<AuthCode>;

@Schema({ timestamps: true })
export class AuthCode {
  @Prop()
  code: string;

  @Prop()
  expireDateTime: Date;

  @Prop({ type: Types.ObjectId })
  user_id: Types.ObjectId;
}

export const AuthcodeSchema = SchemaFactory.createForClass(AuthCode);
