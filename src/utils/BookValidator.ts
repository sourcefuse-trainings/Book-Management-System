import type { Book } from "../types/Book.js";
import type { IBookValidator } from "../interfaces/IBookValidator.js";

export class BookValidator implements IBookValidator {
  validate(book: Book): void {
    if (!book.title) throw new Error("Title is required");
    if (!book.isbn) throw new Error("ISBN is required");
    if (!book.publication_date) throw new Error("Publication date is required");
    if (!book.author?.name) throw new Error("Author name is required");
    if (!book.genre?.name) throw new Error("Genre is required");
    if (!["Printed", "E-Book"].includes(book.type))
      throw new Error("Invalid book type");
    if (book.price <= 0) throw new Error("Price must be positive");
  }
}