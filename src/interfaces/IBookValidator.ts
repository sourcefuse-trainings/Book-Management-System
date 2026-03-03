import type { Book } from "../types/Book.js";

export interface IBookValidator {
  validate(book: Book): void;
}