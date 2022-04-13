import { Schema } from 'mongoose';
import { CatGender } from './cat.constant';
import * as mongoosePaginate from 'mongoose-paginate-v2';

const CAT_MODEL = 'cat';
const CatSchema = new Schema(
  {
    name: String,
    age: Number,
    gender: {
      type: String,
      enum: Object.values(CatGender),
    },
  },
  {
    timestamps: true,
  },
);

CatSchema.plugin(mongoosePaginate);

export { CatSchema, CAT_MODEL };
