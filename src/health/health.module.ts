import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { SearchModule } from 'src/search/search.module';
import { TerminusModule } from '@nestjs/terminus';
import { ElasticSearchHealth } from './elasticSearch.health';

@Module({
  controllers: [HealthController],
  providers: [ElasticSearchHealth],
  imports: [SearchModule, TerminusModule],
})
export class HealthModule {}
