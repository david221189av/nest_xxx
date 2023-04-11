import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BookDTO } from './book.dto';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { AuthorService } from 'src/authors/author.service';
import { ObjectID } from 'typeorm';

@Controller('books')
export class BooksController {
  constructor(
    private readonly bookService: BookService,
    private readonly authorService: AuthorService,
  ) {}

  @Get()
  async getBooks(): Promise<Book[]> {
    return await this.bookService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async insertBook(@Body() book: BookDTO): Promise<any> {
    let authorModel = null;

    if (book?.author_id) {
      // check if el. exists
      try {
        authorModel = await this.authorService.findOne(book?.author_id);
      } catch (e) {
        throw new NotFoundException('Author Not Found');
      }
    }

    const bookInserted = await this.bookService.insert({
      ...book,
      author_id: authorModel?.id ?? null,
    });

    return bookInserted;
  }

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<Book> {
    try {
      return await this.bookService.findOne(id);
    } catch (e) {
      throw new NotFoundException('Book Not Found');
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async updateBook(@Body() book: BookDTO, @Param('id') id: ObjectID) {
    let authorModel = null;

    if (book?.author_id) {
      try {
        authorModel = await this.authorService.findOne(book?.author_id);
      } catch (e) {
        throw new NotFoundException('Author Not Found');
      }
    }

    const response = await this.bookService.update(id, {
      ...book,
      author_id: authorModel?.id || null,
    });

    if (!response.affected) {
      throw new NotFoundException('Book Not Found');
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAuthor(@Param('id') id: string): Promise<void> {
    this.bookService.remove(id);
  }
}
