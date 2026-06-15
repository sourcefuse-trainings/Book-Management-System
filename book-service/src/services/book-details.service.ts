import {AuthorService} from './author.service';
import {CategoryService} from './category.service';

export class BookDetailsService {
  static async getBookDetails(book: any) {
    const author = await AuthorService.getAuthorById(book.authorId);

    const category = await CategoryService.getCategoryById(book.categoryId);

    return {
      ...book,
      author,
      category,
    };
  }

  static async getAllBookDetails(books: any[]) {
    const result = [];

    for (const book of books) {
      const author = await AuthorService.getAuthorById(book.authorId);

      const category = await CategoryService.getCategoryById(book.categoryId);

      result.push({
        ...book,
        author,
        category,
      });
    }

    return result;
  }
}
