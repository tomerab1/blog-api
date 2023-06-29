import { createTransport } from 'nodemailer';
import SmtpBase from '../smtp-base.interface';
import { ConfigService } from '@nestjs/config';

export default class SmtpNodemailer extends SmtpBase {
  private readonly transport;
  constructor(configService: ConfigService) {
    super(configService);

    this.transport = createTransport({
      host: configService.get('NODEMAILER_HOST'),
      port: configService.get('NODEMAILER_PORT'),
      secure: configService.get('NODEMAILER_SECURE'),
      auth: {
        user: configService.get('NODEMAILER_USER'),
        pass: configService.get('NODEMAILER_PASS'),
      },
    });
  }

  async sendEmailVerification(recipient: string): Promise<void> {}
}
