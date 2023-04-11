import { Module } from '@nestjs/common';
import AuthorsController from './authors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { AuthorService } from './author.service';
import { BookService } from 'src/books/book.service';
import { Book } from 'src/books/book.entity';

@Module({
  providers: [AuthorService, BookService],
  controllers: [AuthorsController],
  imports: [TypeOrmModule.forFeature([Author, Book])],
})
export class AuthorsModule {}
