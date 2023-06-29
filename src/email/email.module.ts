import { Logger, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { SMTP_TOKEN } from './constants';
import SmtpNodemailer from './clients/smtp-nodemailer.class';

@Module({
  controllers: [],
  providers: [
    EmailService,
    ConfigService,
    {
      provide: SMTP_TOKEN,
      useFactory: async (configService: ConfigService) => {
        Logger.debug('Initializing Smtp...');
        return new SmtpNodemailer(configService);
      },
      inject: [ConfigService],
    },
  ],
  imports: [UserModule],
})
export class EmailModule {}
