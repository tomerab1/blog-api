import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import CreateUserDto from 'src/user/dtos/createUser.dto';
import SignInDto from './dtos/signIn.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpData: CreateUserDto) {
    return this.authService.signUp(signUpData);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() signInData: SignInDto) {
    return this.authService.signIn(signInData);
  }
}
