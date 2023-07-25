import {
  IsBoolean,
  IsISO4217CurrencyCode,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

class SubscriptionPlan {
  @IsBoolean()
  @IsNotEmpty()
  public readonly paid: boolean;

  @IsPositive()
  public readonly amount: number;

  @IsISO4217CurrencyCode()
  public readonly currency: string;
}

export class CreateSubscribeDto {
  @IsString()
  @IsNotEmpty()
  public readonly email: string;

  @IsNotEmpty()
  public readonly plan: SubscriptionPlan;
}
