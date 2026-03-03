import type { BaseBook } from "../models/BaseBook.js";
import type { Book } from "../types/Book.js";

export interface IBookFactory {
  create(book: Book, extra?: number): BaseBook;
}