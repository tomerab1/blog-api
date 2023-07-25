import { Inject, Injectable, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { Socket } from 'socket.io';
import { cli } from 'winston/lib/winston/config';
import { REQUEST_USER_KEY } from '../iam.constants';

@Injectable()
export class AuthTokenService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  verify(client: Socket): boolean {
    const { autherization } = client.handshake.headers || null;
    const token = this.extractTokenFromHeaders(autherization as string);

    if (!token) return false;

    const payload = this.jwtService.verify(token, this.jwtConfiguration);

    if (!payload) return false;

    client[REQUEST_USER_KEY] = payload;
    return true;
  }

  private extractTokenFromHeaders(headers: string) {
    return headers?.split(' ')[1] ?? null;
  }
}
