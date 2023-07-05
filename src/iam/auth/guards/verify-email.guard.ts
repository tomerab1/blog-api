import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { REQUEST_USER_KEY } from 'src/iam/iam.constants';
import { UserService } from 'src/user/user.service';

@Injectable()
export default class EmailVerificationGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const email = request[REQUEST_USER_KEY].email;
    const user = await this.userService.findOneEmail(email);

    if (!user.isEmailVerified)
      throw new UnauthorizedException(`Email is not verified`);
    return true;
  }
}
