import { Module } from '@nestjs/common';
import HashingService from './hashing/hashing.service';
import BcryptService from './hashing/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [JwtModule.registerAsync(jwtConfig.asProvider())],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
  exports: [HashingService],
})
export class IamModule {}
