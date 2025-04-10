import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './schemas/books.schema';

@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private readonly bookModel: Model<BookDocument>) {}

  async create(createBookDto: CreateBookDto, userId: string) {
    const createdBook = new this.bookModel({
      ...createBookDto,
      user: userId,
    });
    return await createdBook.save();
  }

  async findAllByUser(userId: string) {
    return await this.bookModel.find({ user: userId }).exec();
  }

  async findOneByUser(id: string, userId: string) {
    const book = await this.bookModel.findById(id);
    if (!book || book.user.toString() !== userId) {
      throw new ForbiddenException('Acesso negado');
    }
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto, userId: string) {
    const book = await this.bookModel.findById(id);
    if (!book || book.user.toString() !== userId) {
      throw new ForbiddenException('Acesso negado');
    }
    Object.assign(book, updateBookDto);
    return await book.save();
  }

  async remove(id: string, userId: string) {
    const book = await this.bookModel.findById(id);
    if (!book || book.user.toString() !== userId) {
      throw new ForbiddenException('Acesso negado');
    }
    return await book.deleteOne();
  }
}
