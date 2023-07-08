import User from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subscribe {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column({ unique: true })
  public readonly email: string;

  @Column({ default: false })
  public readonly paid: boolean;

  @ManyToOne(() => User, (user: User) => user.subscribers, { cascade: true })
  public readonly owner: User;
}
