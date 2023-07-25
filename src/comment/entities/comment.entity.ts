import Post from 'src/post/entities/post.entity';
import User from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Comment {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public readonly content: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  public readonly uploadDate: Date;

  @ManyToOne(() => User, (user: User) => user.comments, { cascade: true })
  public readonly author: User;

  @ManyToOne(() => Post, (post: Post) => post.comments, { cascade: true })
  public readonly post: Post;
}
