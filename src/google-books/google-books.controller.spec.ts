import { Test, TestingModule } from '@nestjs/testing';
import { GoogleBooksController } from './google-books.controller';

describe('GoogleBooksController', () => {
  let controller: GoogleBooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoogleBooksController],
    }).compile();

    controller = module.get<GoogleBooksController>(GoogleBooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
