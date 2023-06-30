import { Inject, Injectable } from '@nestjs/common';
import { SMTP_TOKEN } from './constants';
import { UserService } from 'src/user/user.service';
import SmtpBase from './smtp-base.interface';
import User from 'src/user/entities/user.entity';

@Injectable()
export class EmailService {
  constructor(
    @Inject(SMTP_TOKEN)
    private readonly transporter: SmtpBase,
    private readonly userService: UserService,
  ) {}

  async sendEmailVerification(recipient: string): Promise<void> {
    const user = await this.userService.findOneEmail(recipient);
    const link = `http://localhost:3000/email/verify?id=${user.emailVerificationUuid}`;
    this.transporter.sendEmailVerification(recipient, link);
  }

  async verifyEmail(id: string): Promise<void> {
    const user = await this.userService.findOneUuid(id);
    const newUser = {
      ...user,
      isEmailVerified: true,
    } satisfies User;

    await this.userService.update(newUser.id, newUser);
  }
}
