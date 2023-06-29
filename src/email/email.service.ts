import { Inject, Injectable } from '@nestjs/common';
import { SMTP_TOKEN } from './constants';
import { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { UserService } from 'src/user/user.service';

@Injectable()
export class EmailService {
  constructor(
    @Inject(SMTP_TOKEN)
    private readonly transporter: Transporter<SMTPTransport.SentMessageInfo>,
    private readonly userService: UserService,
  ) {}

  async sendEmail() {
    await this.transporter.sendMail({
      from: '',
      to: '',
      subject: '',
      text: '',
      html: '',
    });
  }
}
