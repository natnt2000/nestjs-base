import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TPermissionDoc } from './permission.interface';
import { PERMISSION_MODEL } from './permission.schema';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(PERMISSION_MODEL)
    private readonly model: Model<TPermissionDoc>,
  ) {}
}
