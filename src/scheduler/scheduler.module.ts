import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { SchedulerController } from './scheduler.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  controllers: [SchedulerController],
  providers: [SchedulerService],
  imports: [EventEmitterModule.forRoot()],
})
export class SchedulerModule {}
