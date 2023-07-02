import User from 'src/user/entities/user.entity';
import { Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subscribe {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @ManyToMany(() => User, (user: User) => user.subscribers)
  public readonly subscriptions: User[];
}
