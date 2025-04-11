import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  startDate: string;

  @Prop()
  endDate: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: false })
  avaliation: number;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: mongoose.Schema.Types.ObjectId;

}

export const BookSchema = SchemaFactory.createForClass(Book);
