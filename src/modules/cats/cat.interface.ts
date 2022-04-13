import { CatGender } from './cat.constant';
import { Document } from 'mongoose';

export interface ICat {
  name: string;
  age: number;
  gender: CatGender;
}

export type ICatDoc = ICat & Document;

export interface IQueryCat extends ICat {
  _id: string;
}
