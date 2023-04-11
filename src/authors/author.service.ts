import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Author } from './author.entity';
import { Book } from 'src/books/book.entity';
// import { ObjectID } from 'typeorm/driver/mongodb/typings';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: MongoRepository<Author>,
    @InjectRepository(Book)
    private readonly bookRepository: MongoRepository<Book>,
  ) {}

  async findAll(): Promise<Author[]> {
    return await this.authorRepository.find();
  }

  async findOne(id: string): Promise<Author> {
    return await this.authorRepository.findOneByOrFail(id);
  }

  async findAllBooksByAuthor(id: string): Promise<Book[]> {
    return await this.bookRepository.findBy({
      author_id: new ObjectID(id),
    });
  }

  async insert(author: Author): Promise<Author> {
    return await this.authorRepository.save(author);
  }

  async update(id: string, author: Author) {
    author.updated_at = new Date();

    return await this.authorRepository.update(id, author);
  }

  async remove(id: string) {
    return this.authorRepository.delete(id);
  }
}
