import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorsController } from './authors.controller';
import { Author, AuthorSchema } from './schemas/author.schema';
import { AuthorsService } from './services/authors.service';

@Module({
  providers: [AuthorsService],
  controllers: [AuthorsController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Author.name,
        schema: AuthorSchema,
      },
    ]),
  ],
})
export class AuthorsModule {}
