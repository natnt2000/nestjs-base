import { Schema } from 'mongoose';
import { Feature } from './permission.constant';

const PERMISSION_MODEL = 'permission';

const PermissionSchema = new Schema(
  {
    feature: {
      type: String,
      enum: Object.values(Feature),
    },
    action: {
      type: String,
    },
  },
  { timestamps: true },
);

export { PERMISSION_MODEL, PermissionSchema };
