import { IsDefined, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPositive()
  @IsDefined()
  price: number;
}
