import { Status } from './product.constant';

export interface IProduct {
  name: string;
  price: number;
  status: Status;
}
