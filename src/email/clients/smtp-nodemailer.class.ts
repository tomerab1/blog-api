import { Transporter, createTransport } from 'nodemailer';
import SmtpBase from '../smtp-base.interface';
import { ConfigService } from '@nestjs/config';
import { InternalServerErrorException } from '@nestjs/common';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export default class SmtpNodemailer extends SmtpBase {
  private readonly transport: Transporter<SMTPTransport.SentMessageInfo>;
  constructor(configService: ConfigService) {
    super(configService);

    this.transport = createTransport({
      service: configService.get('NODEMAILER_SERVICE'),

      auth: {
        user: configService.get('NODEMAILER_USER'),
        pass: configService.get('NODEMAILER_PASS'),
      },
    });
  }

  async sendEmailVerification(
    recipient: string,
    verificationLink: string,
  ): Promise<void> {
    try {
      this.transport.sendMail({
        from: this.configService.get('NODEMAILER_USER'),
        to: recipient,
        subject: 'Email Verification',
        html: `
        <!DOCTYPE html>
        <html lang="en">
    
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
        </head>
    
        <body>
          <h1>Email Verification</h1>
          <p>Thank you for signing up! To verify your email address, please click the button below:</p>
          <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">Verify Email</a>
          <p>If you did not sign up for this account, you can safely ignore this email.</p>
        </body>
    
        </html>
      `,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
