import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { CatGender } from '../cat.constant';

export class CreateCatDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(1)
  age: number;

  @IsEnum(CatGender)
  gender: CatGender;
}
