import Post from 'src/post/entities/post.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public readonly name: string;

  @ManyToMany(() => Post, (post: Post) => post.tags)
  public readonly posts: Post[];
}
