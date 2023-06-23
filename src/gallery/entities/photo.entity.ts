import User from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Photo {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public readonly key: number;

  @Column()
  public readonly uri: string;

  @Column()
  public readonly title: string;

  @Column()
  public readonly description: string;

  @Column()
  public readonly uploadDate: Date;

  @ManyToOne(() => User, (user: User) => user.gallery)
  public readonly user: User;
}
