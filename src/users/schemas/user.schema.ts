import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User extends Document {
  @Prop()
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
