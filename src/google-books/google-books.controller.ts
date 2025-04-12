import { Controller, Get, Query } from '@nestjs/common';
import { GoogleBooksService } from './google-books.service';

@Controller('google-books')
export class GoogleBooksController {
  constructor(private readonly googleBooksService: GoogleBooksService) {}

  @Get('search')
  async search(@Query('q') query: string) {
    return this.googleBooksService.searchBooks(query);
  }
}
