import { Types } from 'mongoose';

export class CreateAuthcodeDto {
  constructor(
    readonly user_id: Types.ObjectId,
    readonly code: string,
    readonly expireDatetime: Date,
  ) {}
}
