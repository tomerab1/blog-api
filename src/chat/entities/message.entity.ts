import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chat } from './chat.entity';
import User from 'src/user/entities/user.entity';

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  public readonly createdAt: Date;

  @Column()
  public readonly content: string;

  @ManyToOne(() => User, (user: User) => user.messages)
  public readonly owner: User;

  @ManyToOne(() => Chat, (chat: Chat) => chat.messages)
  public readonly chat: Chat;
}
