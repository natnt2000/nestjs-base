import { Schema } from 'mongoose';
import { ROLE_MODEL } from '../roles/role.schema';

const USER_MODEL = 'user';

const UserSchema = new Schema(
  {
    email: String,
    password: String,
    fullName: String,
    role: {
      type: Schema.Types.ObjectId,
      ref: ROLE_MODEL,
    },
  },
  {
    timestamps: true,
  },
);

export { USER_MODEL, UserSchema };
