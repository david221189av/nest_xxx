import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type AuthorDocument = Author & Document;

@Schema()
export class Author {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  birthday: Date;

  @Prop()
  updated_at: Date;

  @Prop()
  created_at: Date;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
