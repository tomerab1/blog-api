import { Inject, Injectable } from '@nestjs/common';
import { SMTP_TOKEN } from './constants';
import { UserService } from 'src/user/user.service';
import SmtpBase from './interfaces/smtp-base.interface';
import User from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/iam/config/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    @Inject(SMTP_TOKEN)
    private readonly transporter: SmtpBase,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async sendEmailVerification(recipient: string): Promise<void> {
    const user = await this.userService.findOneEmail(recipient);
    const token = await this.generateEmailConfirmationToken(user);
    const link = `http://localhost:3000/email/verify?id=${token}`;
    this.transporter.sendEmailVerification(recipient, link);
  }

  private async generateEmailConfirmationToken(user: User) {
    return this.jwtService.signAsync(
      // payload
      {
        sub: user.id,
        email: user.email,
      },
      // configs
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: '1d',
      },
    );
  }

  async verifyEmail(token: string): Promise<void> {
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );

      const user = await this.userService.findOne(payload.sub);

      const newUser = {
        ...user,
        isEmailVerified: true,
      } satisfies User;

      this.userService.update(newUser.id, newUser);
    } catch (error) {
      throw error;
    }
  }
}
