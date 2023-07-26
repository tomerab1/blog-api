import { Exclude, Expose } from 'class-transformer';
import { Chat } from 'src/chat/entities/chat.entity';
import { ChatMessage } from 'src/chat/entities/message.entity';
import Comment from 'src/comment/entities/comment.entity';
import Image from 'src/image/entities/image.entity';
import Post from 'src/post/entities/post.entity';
import { Subscribe } from 'src/subscribe/entities/subscribe.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@Expose()
export default class User {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public readonly firstName: string;

  @Column()
  public readonly lastName: string;

  @Column({ unique: true })
  public readonly email: string;

  @Column({ default: false })
  public readonly isEmailVerified: boolean;

  @Column()
  @Exclude()
  public readonly password: string;

  @OneToMany(() => Post, (post: Post) => post.user, {
    cascade: true,
  })
  public readonly posts: Post[];

  @OneToMany(() => Image, (image: Image) => image.owner, { cascade: true })
  public readonly images: Image[];

  // people the user subscribes to.
  @OneToMany(() => Subscribe, (sub: Subscribe) => sub.subscriber)
  public readonly subscriptions: Subscribe[];

  // people subscribed to the user.
  @OneToMany(() => Subscribe, (sub: Subscribe) => sub.subscribedTo)
  public readonly subscribers: Subscribe[];

  @OneToMany(() => Comment, (comment: Comment) => comment.author)
  public readonly comments: Comment[];

  @ManyToMany(() => Chat, (chat: Chat) => chat.users, { cascade: true })
  @JoinTable()
  public readonly chats: Chat[];

  @OneToMany(() => ChatMessage, (msg: ChatMessage) => msg.owner)
  public readonly messages: ChatMessage[];
}
