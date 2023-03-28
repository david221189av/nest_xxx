import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { Author, AuthorDocument } from '../schemas/author.schema';

@Injectable()
export class AuthorsService {
  private authors = [];

  constructor(
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
  ) {}

  async getAll(): Promise<Author[]> {
    return this.authorModel.find().exec();
  }

  async getById(id: string): Promise<Author> {
    return this.authorModel.findById(id);
  }

  async create(authorDto: CreateAuthorDto): Promise<Author> {
    const newAuthor = new this.authorModel(authorDto);

    return newAuthor.save();
  }

  async remove(id: string): Promise<Author> {
    return this.authorModel.findByIdAndRemove(id);
  }

  async update(id: string, authorDto: UpdateAuthorDto): Promise<Author> {
    return this.authorModel.findByIdAndUpdate(id, authorDto, { new: true });
  }
}
