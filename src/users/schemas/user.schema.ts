import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
