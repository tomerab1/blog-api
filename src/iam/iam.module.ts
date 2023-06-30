import { Module } from '@nestjs/common';
import HashingService from './hashing/hashing.service';
import BcryptService from './hashing/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './auth/guards/authentication.guard';
import { AccessTokenGuard } from './auth/guards/accessToken.guard';
import { EmailModule } from 'src/email/email.module';
import EmailVerificationGuard from './auth/guards/verify-email.guard';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    UserModule,
    EmailModule,
  ],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    AccessTokenGuard,
    EmailVerificationGuard,
    AuthService,
  ],
  exports: [HashingService],
  controllers: [AuthController],
})
export class IamModule {}
