import { PickType } from '@nestjs/swagger';
import { SignupDto } from './sign-up.dto';

export class SignInDto extends PickType(SignupDto, ['email', 'password']) {}
