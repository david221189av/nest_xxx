import {
  Allow,
  IsIBAN,
  IsISO8601,
  IsOptional,
  IsString,
} from 'class-validator';
import { ObjectID, ObjectIdColumn } from 'typeorm';

export class BookDTO {
  @ObjectIdColumn()
  id: ObjectID;

  @IsString()
  title: string;

  @IsIBAN()
  iban: string;

  @IsOptional()
  @IsString()
  author_id?: string;

  @IsOptional()
  @IsISO8601({ strict: false, strictSeparator: false })
  @Allow()
  published_at?: Date;

  created_at?: Date;

  updated_at?: Date;
}
