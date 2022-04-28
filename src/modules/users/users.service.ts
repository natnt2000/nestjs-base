import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUserDoc } from './user.interface';
import { USER_MODEL } from './user.schema';
import { Model } from 'mongoose';
import { SignupDto } from '../auth/dto/sign-up.dto';
import { encryptPassword } from '../../common/utility';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(USER_MODEL) private readonly model: Model<IUserDoc>,
  ) {}

  async create(createUserDto: SignupDto) {
    const password = encryptPassword(createUserDto.password);
    await this.model.create({ ...createUserDto, password });
  }

  async findByEmail(email: string) {
    return this.model
      .findOne({ email })
      .select('email password fullName')
      .lean();
  }

  async findById(id: string) {
    return await this.model
      .findById(id)
      .populate({
        path: 'role',
        select: 'status',
        populate: { path: 'permissions', select: 'action' },
      })
      .lean();
  }
}
