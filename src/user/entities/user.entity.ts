import { Exclude, Expose } from 'class-transformer';
import Image from 'src/image/entities/image.entity';
import {
  Column,
  Entity,
  JoinColumn,
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

  @Column()
  @Exclude()
  public readonly password: string;

  @JoinColumn()
  @OneToMany(() => Image, (photo: Image) => photo.user, { cascade: true })
  public readonly gallery: Image;
}
