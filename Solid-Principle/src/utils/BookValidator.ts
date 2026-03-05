import type { IBook } from "../models/IBook.js";
import type { IBookValidator } from "../interfaces/IBookValidator.js";

export class BookValidator implements IBookValidator {

  validate(book: IBook): void {

    if (!book.title.trim()) {
      throw new Error("Title required");
    }

    if (!book.isbn.trim()) {
      throw new Error("ISBN required");
    }

    if (!book.author.name.trim()) {
      throw new Error("Author required");
    }

    if (!book.genre.name.trim()) {
      throw new Error("Genre required");
    }

  }

}