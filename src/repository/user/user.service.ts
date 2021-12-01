import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RepositoryBase } from '@repository/repository-base';
import { Document, Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService extends RepositoryBase<User> {
  constructor(@InjectModel(User.name) model: Model<User & Document>) {
    super(model);
  }
}
