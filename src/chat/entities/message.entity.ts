import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(() => Chat, (chat: Chat) => chat.messages)
  public readonly chat: Chat;
}
