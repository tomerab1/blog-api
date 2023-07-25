import User from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['subscriber', 'subscribedTo'])
export class Subscribe {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  public readonly subscribedAt: Date;

  // people the user subscribes to.
  @ManyToOne(() => User, (user: User) => user.subscriptions)
  public readonly subscriber: User;

  // people subscribed to the user.
  @ManyToOne(() => User, (user: User) => user.subscribers)
  public readonly subscribedTo: User;
}
