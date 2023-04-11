import { Book } from 'src/books/book.entity';
import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ObjectID,
} from 'typeorm';

@Entity('authors')
export class Author {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  birthday?: Date;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToMany(() => Book, (book) => book.author_id)
  books?: Book[];

  constructor(author?: Partial<Author>) {
    Object.assign(this, author);
  }
}
