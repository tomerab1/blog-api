import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { subscribe } from 'diagnostics_channel';
import {
  EVENT_SUBSCRIBED,
  EVENT_SUBSCRIPTION_PAID,
} from 'src/subscribe/constants';
import { Subscribe } from 'src/subscribe/entities/subscribe.entity';

@Injectable()
export class PaymentsService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @OnEvent(EVENT_SUBSCRIBED)
  handleSubscription(payload: Subscribe) {
    if (payload.paid) {
      // Will schedule the payment with scheduler
      this.eventEmitter.emit(EVENT_SUBSCRIPTION_PAID, subscribe);
    }
  }
}
