import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsModule } from './authors/authors.module';
import { BooksController } from './books/books.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', { dbName: 'mongodb' }),
    AuthorsModule,
  ],
  controllers: [AppController, BooksController],
  providers: [AppService],
})
export class AppModule {}
