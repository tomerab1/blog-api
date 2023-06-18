import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { IamModule } from 'src/iam/iam.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/iam/config/jwt.config';

@Module({
  imports: [
    UserModule,
    IamModule,
    JwtModule,
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
