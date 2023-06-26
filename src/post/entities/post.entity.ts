import Image from 'src/image/entities/image.entity';
import User from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
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

  @OneToOne(() => Image, { cascade: true, eager: true })
  @JoinColumn()
  public readonly image: Image;

  @ManyToOne(() => User, (user: User) => user.posts)
  public readonly user: User;
}
