import { Controller, Get, Query } from '@nestjs/common';
import { Auth } from 'src/iam/auth/decorators/auth.decorator';
import { AuthType } from 'src/iam/auth/enums/auth-type.enum';
import { EmailService } from './email.service';

@Auth(AuthType.None)
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('/verify')
  verifyEmail(@Query('id') id: string) {
    this.emailService.verifyEmail(id);
  }
}
