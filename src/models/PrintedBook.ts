import type { Book } from "../types/Book.js";
import { BaseBook } from "./BaseBook.js";

export class PrintedBook extends BaseBook {
  pages: number;

  constructor(book: Book, pages: number = 300) {
    super(book);
    this.pages = pages;
  }

  getExtraInfo(): string {
    return `${this.pages} pages`;
  }
}