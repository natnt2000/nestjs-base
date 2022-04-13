import { Schema } from 'mongoose';

const USER_MODEL = 'user';

const UserSchema = new Schema(
  {
    email: String,
    password: String,
    fullName: String,
  },
  {
    timestamps: true,
  },
);

export { USER_MODEL, UserSchema };
