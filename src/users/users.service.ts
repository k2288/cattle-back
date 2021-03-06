import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { REQUEST } from '@nestjs/core';
import { AuthPayload } from '../auth/models/auth-payload';
import { Request } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOneByPhone(phone: string) {
    return this.userModel.findOne({ phone: phone });
  }

  async findOne(id: Types.ObjectId) {
    return this.userModel.findOne({ _id: id });
  }

  async currentUser() {
    return this.userModel
      .findOne({
        _id: (this.request.user as AuthPayload).user_id,
      })
      .select('phone');
  }
}
