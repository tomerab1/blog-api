import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { Auth } from 'src/iam/auth/decorators/auth.decorator';
import { AuthType } from 'src/iam/auth/enums/auth-type.enum';
import { ElasticSearchHealthIndicator } from 'src/search/elasticSearchHealth.indicator';

@Auth(AuthType.None)
@Controller('health')
export class HealthController {
  constructor(
    private readonly elasticSearchHealth: ElasticSearchHealthIndicator,
    private readonly healthService: HealthCheckService,
    private readonly dbHealth: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthService.check([
      () => this.dbHealth.pingCheck('database'),
      () => this.elasticSearchHealth.pingCheck('search'),
    ]);
  }
}
