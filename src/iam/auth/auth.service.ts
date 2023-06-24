import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import CreateUserDto from 'src/user/dtos/create-user.dto';
import { UserService } from 'src/user/user.service';
import SignInDto from './dtos/signIn.dto';
import HashingService from 'src/iam/hashing/hashing.service';
import PostgresErrorCode from 'src/database/postgresErrorCodes.enum';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/iam/config/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signUp(signUpData: CreateUserDto) {
    const user = { ...signUpData };
    user.password = await this.hashService.hash(signUpData.password);
    try {
      await this.userService.create(user);
    } catch (error) {
      if (error.code === PostgresErrorCode.UniqueViolation)
        throw new ConflictException();

      throw error;
    }
  }

  async signIn(signInData: SignInDto) {
    const user = await this.userService.findOneEmail(signInData.email);
    if (!user) throw new UnauthorizedException('User doesnt exist');
    const isEqual = await this.hashService.compare(
      signInData.password,
      user.password,
    );
    if (!isEqual) throw new UnauthorizedException('Password doesnt match');
    const accessToken = await this.jwtService.signAsync(
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
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );
    return { accessToken };
  }
}
