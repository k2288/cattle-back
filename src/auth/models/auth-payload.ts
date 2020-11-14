import { Types } from 'mongoose';

export class AuthPayload {
  user_id: string;

  constructor(user_id: string) {
    this.user_id = user_id;
  }
}
