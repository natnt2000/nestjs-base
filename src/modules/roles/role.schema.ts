import { Schema } from 'mongoose';
import { PERMISSION_MODEL } from '../permissions/permission.schema';
import { Status } from './role.constant';

const ROLE_MODEL = 'role';

const RoleSchema = new Schema(
  {
    name: String,
    status: {
      type: String,
      enum: Object.values(Status),
    },
    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: PERMISSION_MODEL,
      },
    ],
  },
  { timestamps: true },
);

export { ROLE_MODEL, RoleSchema };
