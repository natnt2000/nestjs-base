import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ROLE_MODEL } from './role.schema';
import { Model } from 'mongoose';
import { IRole, TRoleDoc } from './role.interface';
import { Status } from './role.constant';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(ROLE_MODEL) private readonly model: Model<TRoleDoc>,
  ) {}

  async create() {
    const input: IRole[] = [
      {
        name: 'Super Administrator',
        permissions: [
          '6260d05187dd523b4f559f53',
          '6260d05187dd523b4f559f54',
          '6260d05187dd523b4f559f55',
          '6260d05187dd523b4f559f56',
        ],
        status: Status.ACTIVE,
      },
      {
        name: 'Role Test 1',
        permissions: ['6260d05187dd523b4f559f53', '6260d05187dd523b4f559f55'],
        status: Status.ACTIVE,
      },
    ];

    return this.model.insertMany(input);
  }
}
