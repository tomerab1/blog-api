import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { SearchModule } from 'src/search/search.module';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  controllers: [HealthController],
  imports: [SearchModule, TerminusModule],
})
export class HealthModule {}
