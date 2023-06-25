import Image from 'src/image/entities/image.entity';
import User from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
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

  @OneToOne(() => Image, (image: Image) => image.post, { cascade: true })
  @JoinColumn()
  public readonly image: Image;

  @ManyToMany(() => User, (user: User) => user.posts)
  public readonly user: User;
}
