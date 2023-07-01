import { Logger, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { SMTP_TOKEN } from './constants';
import { EmailController } from './email.controller';
import SmtpNodemailer from './clients/smtp-nodemailer.class';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/iam/config/jwt.config';

@Module({
  controllers: [EmailController],
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
  imports: [
    UserModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  exports: [EmailService],
})
export class EmailModule {}
