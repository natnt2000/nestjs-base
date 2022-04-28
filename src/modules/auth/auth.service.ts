import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from '../../common/utility';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignupDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    return this.usersService.create(signupDto);
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new HttpException(
        { key: 'auth.INVALID_CREDENTIALS' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isMatched = comparePassword(user.password, password);

    if (!isMatched) {
      throw new HttpException(
        { key: 'auth.INVALID_CREDENTIALS' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    delete user.password;

    const accessToken = this.jwtService.sign(user);

    return {
      accessToken,
      ...user,
    };
  }
}
