import type { Book } from "../types/Book.js";
import { BaseBook } from "./BaseBook.js";

export class EBook extends BaseBook {
  fileSize: number;

  constructor(book: Book, fileSize: number = 5) {
    super(book);
    this.fileSize = fileSize;
  }

  getExtraInfo(): string {
    return `${this.fileSize} MB`;
  }
}