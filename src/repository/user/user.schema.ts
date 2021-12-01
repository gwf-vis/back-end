import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string; // TODO may use authenticationHash

  @Prop({ type: String })
  token?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
