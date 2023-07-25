import User from 'src/user/entities/user.entity';
import { Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChatMessage } from './message.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @OneToMany(() => ChatMessage, (message: ChatMessage) => message.chat, {
    eager: true,
    cascade: true,
  })
  public readonly messages: ChatMessage[];

  @ManyToMany(() => User, (user: User) => user.chats, { cascade: true })
  public readonly users: User[];
}
