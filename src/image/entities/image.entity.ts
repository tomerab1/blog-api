import Post from 'src/post/entities/post.entity';
import {
  Column,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@Index(['key'])
export default class Image {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public readonly key: string;

  @Column()
  public readonly uri: string;

  @Column()
  public readonly fileName: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  public readonly uploadedAt: Date;

  @Column({ nullable: true })
  public readonly updatedAt: Date;

  @OneToOne(() => Post, (post: Post) => post.image)
  public readonly post: Post;
}
