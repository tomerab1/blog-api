import { Exclude, Expose } from 'class-transformer';
import Photo from 'src/gallery/entities/photo.entity';
import {
  Column,
  Entity,
  JoinTable,
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

  @JoinTable()
  @OneToMany(() => Photo, (photo: Photo) => photo.user, { cascade: true })
  public readonly gallery: Photo[];
}
