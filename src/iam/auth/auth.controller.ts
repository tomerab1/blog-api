import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import CreateUserDto from 'src/user/dtos/create-user.dto';
import SignInDto from './dtos/signIn.dto';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { EmailService } from 'src/email/email.service';

@Auth(AuthType.None)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() signUpData: CreateUserDto) {
    await this.authService.signUp(signUpData);
    await this.emailService.sendEmailVerification(signUpData.email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() signInData: SignInDto) {
    return this.authService.signIn(signInData);
  }
}
