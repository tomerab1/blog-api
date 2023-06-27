import Comment from 'src/commentary/entities/comment.entity';
import Image from 'src/image/entities/image.entity';
import User from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class Post {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column({ nullable: false })
  public readonly title: string;

  @Column({ nullable: true })
  public readonly content: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  public readonly uploadDate: Date;

  @OneToMany(() => Image, (image: Image) => image.post, { cascade: true })
  public readonly images: Image[];

  @ManyToOne(() => User, (user: User) => user.posts)
  public readonly user: User;

  @OneToMany(() => Comment, (comments: Comment) => comments.post)
  public readonly comments: Comment[];
}
