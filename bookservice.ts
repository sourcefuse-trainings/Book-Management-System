import Book from "../models/Book";

class BookService {
  static async createBook(data: { title: string; authorId: number }) {
    return await Book.create(data);
  }

  static async getAllBooks() {
    return await Book.findAll();
  }

  static async updateBook(id: number, data: Partial<{ title: string; authorId: number }>) {
    const book = await Book.findByPk(id);
    if (book) return await book.update(data);
    throw new Error("Book not found");
  }

  static async deleteBook(id: number) {
    const book = await Book.findByPk(id);
    if (book) return await book.destroy();
    throw new Error("Book not found");
  }
}

export default BookService;
