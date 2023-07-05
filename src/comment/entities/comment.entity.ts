import Post from 'src/post/entities/post.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Comment {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public readonly content: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  public readonly uploadDate: Date;

  @ManyToOne(() => Post, (post: Post) => post.comments, { cascade: true })
  public readonly post: Post;
}
