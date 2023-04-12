import { Author } from 'src/authors/author.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('books')
export class Book {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;

  @Column()
  iban: string;

  @Column()
  published_at?: Date;

  @Column()
  author_id?: string;

  @ManyToOne(() => Author, (author) => author.books)
  author?: Author;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  constructor(book?: Partial<Book>) {
    Object.assign(this, book);
  }
}
