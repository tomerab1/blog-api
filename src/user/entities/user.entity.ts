import { Exclude, Expose } from 'class-transformer';
import Image from 'src/image/entities/image.entity';
import Post from 'src/post/entities/post.entity';
import {
  Column,
  Entity,
  Generated,
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
    eager: true,
  })
  public readonly posts: Post[];

  @OneToMany(() => Image, (image: Image) => image.owner, { cascade: true })
  public readonly images: Image[];
}
