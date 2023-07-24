import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { SearchModule } from 'src/search/search.module';
import { TerminusModule } from '@nestjs/terminus';
import { ElasticSearchHealthIndicator } from './elasticSearchHealth.indicator';

@Module({
  controllers: [HealthController],
  providers: [ElasticSearchHealthIndicator],
  imports: [SearchModule, TerminusModule],
})
export class HealthModule {}
