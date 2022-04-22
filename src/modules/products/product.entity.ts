import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Status } from './product.constant';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ enum: Status, default: Status.ACTIVE, type: 'enum' })
  status: Status;
}
