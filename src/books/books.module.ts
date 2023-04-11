import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './book.service';
import { BooksController } from './books.controller';
import { Book } from './book.entity';
import { AuthorService } from 'src/authors/author.service';
import { Author } from 'src/authors/author.entity';

@Module({
  providers: [BookService, AuthorService],
  controllers: [BooksController],
  imports: [TypeOrmModule.forFeature([Book, Author])],
})
export class BooksModule {}
