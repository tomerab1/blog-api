import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { ElasticSearchHealth } from './elasticSearch.health';
import { Auth } from 'src/iam/auth/decorators/auth.decorator';
import { AuthType } from 'src/iam/auth/enums/auth-type.enum';

@Auth(AuthType.None)
@Controller('health')
export class HealthController {
  constructor(
    private readonly elasticSearchHealth: ElasticSearchHealth,
    private readonly healthService: HealthCheckService,
    private readonly dbHealth: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthService.check([
      () => this.dbHealth.pingCheck('database'),
      () => this.elasticSearchHealth.check('search'),
    ]);
  }
}
