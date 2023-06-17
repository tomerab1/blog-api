import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
  public readonly password: string;
}
