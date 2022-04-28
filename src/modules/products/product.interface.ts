import { Status } from './product.constant';

export interface IProduct {
  id: number;
  name: string;
  price: number;
  status: Status;
}
