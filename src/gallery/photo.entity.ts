import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
