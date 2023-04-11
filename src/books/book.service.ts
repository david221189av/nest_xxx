import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectID } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: MongoRepository<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async findAllByAuthor(id: string): Promise<Book[]> {
    console.log('From bookServ author_id: ', id);

    return this.bookRepository.find();
  }

  async insert(book: Book): Promise<Book> {
    return this.bookRepository.save(book);
  }

  async findOne(id: string): Promise<Book> {
    return await this.bookRepository.findOneByOrFail(id);
  }

  async update(id: ObjectID, book: Book) {
    book.updated_at = new Date();

    return this.bookRepository.update(id, book);
  }

  async remove(id: string) {
    return this.bookRepository.delete(id);
  }
}
