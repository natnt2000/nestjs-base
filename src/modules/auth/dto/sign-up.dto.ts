import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IUser } from '../../users/user.interface';

export class SignupDto implements IUser {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @IsString()
  fullName: string;
}
