import { Inject, Logger, Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Module({
  imports: [ConfigModule],
  providers: [
    PaymentsService,
    {
      provide: Stripe,
      useFactory: async (configService: ConfigService) => {
        Logger.debug('[!] Initializing stripe...');
        return new Stripe(configService.get('STRIPE_SECRET_KEY'), {
          apiVersion: '2022-11-15',
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class PaymentsModule {}
