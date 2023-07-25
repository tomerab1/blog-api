import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import {
  EVENT_SUBSCRIBED,
  EVENT_SUBSCRIPTION_CANCELED,
} from 'src/subscribe/constants';
import { Subscribe } from 'src/subscribe/entities/subscribe.entity';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly stripeClient: Stripe,
  ) {}

  @OnEvent(EVENT_SUBSCRIBED, { async: true })
  async handleSubscription(payload: Subscribe) {
    if (payload.plan?.paid) {
      // Will schedule the payment with scheduler
      const customer: Stripe.Customer =
        await this.stripeClient.customers.create({
          description: 'test customer',
        });

      console.log(customer);
    }
  }

  @OnEvent(EVENT_SUBSCRIPTION_CANCELED)
  handleCanceleSubscription(payload: Subscribe) {
    if (payload.plan?.paid) {
    }
  }
}
