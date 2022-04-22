import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ROLE_MODEL } from './role.schema';
import { Model } from 'mongoose';
import { TRoleDoc } from './role.interface';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(ROLE_MODEL) private readonly model: Model<TRoleDoc>,
  ) {}
}
