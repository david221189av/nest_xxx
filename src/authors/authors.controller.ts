import {
  Controller,
  Param,
  Delete,
  Get,
  Post,
  Put,
  Body,
  HttpCode,
  HttpStatus,
  Header,
} from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './schemas/author.schema';
import { AuthorsService } from './services/authors.service';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorService: AuthorsService) {}

  @Get()
  getAll(): Promise<Author[]> {
    return this.authorService.getAll();
  }

  //   getOneAuthor(@Param() params) {
  @Get(':id')
  getOneAuthor(@Param('id') id: string): Promise<Author> {
    return this.authorService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorService.create(createAuthorDto);
  }

  @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.authorService.remove(id);
  }

  @Put(':id')
  update(
    @Body() updateAuthorDto: UpdateAuthorDto,
    @Param('id') id: string,
  ): Promise<Author> {
    return this.authorService.update(id, updateAuthorDto);
  }
}
