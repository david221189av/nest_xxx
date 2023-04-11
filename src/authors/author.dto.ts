import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsString,
  MaxDate,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

export class CreateAuthorDTO {
  @ObjectIdColumn()
  id: ObjectID;

  @IsString()
  @IsNotEmpty()
  @Column()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  last_name: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MaxDate(new Date())
  @Column()
  birthday?: Date;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
