import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GoogleBooksService {
  private readonly baseUrl = 'https://www.googleapis.com/books/v1/volumes';

  async searchBooks(query: string) {
    const response = await axios.get(this.baseUrl, {
      params: { q: query, maxResults: 10 },
    });

    return response.data.items?.map((item) => {
      const info = item.volumeInfo;
      return {
        title: info.title,
        authors: info.authors,
        description: info.description,
        thumbnail: info.imageLinks?.thumbnail,
        publishedDate: info.publishedDate,
        pageCount: info.pageCount,
      };
    }) ?? [];
  }
}
