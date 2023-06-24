import User from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
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

  @ManyToOne(() => User, (user: User) => user.gallery)
  public readonly user: User;
}
