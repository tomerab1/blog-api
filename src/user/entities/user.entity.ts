import { Exclude, Expose } from 'class-transformer';
import Image from 'src/image/entities/image.entity';
import Post from 'src/post/entities/post.entity';
import { Subscribe } from 'src/subscribe/entities/subscribe.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
}
