import { ConfigService } from '@nestjs/config';

export default abstract class SmtpBase {
  constructor(protected readonly configService: ConfigService) {}

  abstract sendEmailVerification(
    recipient: string,
    verificationLink: string,
  ): Promise<void>;
}
