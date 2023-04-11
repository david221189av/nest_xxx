import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  NotFoundException,
  HttpCode,
  HttpStatus,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Author } from './author.entity';
import { AuthorService } from './author.service';
import { CreateAuthorDTO } from './author.dto';
import { BookService } from 'src/books/book.service';
import { Book } from 'src/books/book.entity';

@Controller('authors')
export default class AuthorsController {
  constructor(
    private readonly authorService: AuthorService,
    private readonly bookService: BookService,
  ) {}

  @Get()
  async getAuthors(): Promise<Author[]> {
    return await this.authorService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async inserAuthor(@Body() author: CreateAuthorDTO): Promise<Author> {
    return await this.authorService.insert(author);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Author> {
    try {
      // return await this.authorService.findOne(id);
      return await this.authorService.findOne(id);
    } catch (e) {
      throw new NotFoundException('Author Not Found');
    }
  }

  @Get(':id/books')
  async getBookById(@Param('id') id: string): Promise<Book[]> {
    try {
      return await this.authorService.findAllBooksByAuthor(id);
    } catch (e) {
      throw new NotFoundException('Book Not Found');
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async updateAuthor(@Body() author: Author, @Param('id') id: string) {
    await this.authorService.update(id, author);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAuthor(@Param('id') id: string): Promise<void> {
    this.authorService.remove(id);
  }
}
