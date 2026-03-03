import type { Book } from "../types/Book.js";
import type { BaseBook } from "../models/BaseBook.js";
import { PrintedBook } from "../models/PrintedBook.js";
import { EBook } from "../models/EBook.js";
import type { IBookFactory } from "../interfaces/IBookFactory.js";

type BookConstructor = new (book: Book, extra?: number) => BaseBook;

export class BookFactory implements IBookFactory {
  private registry: Record<string, BookConstructor> = {
    Printed: PrintedBook,
    "E-Book": EBook
  };

  registerType(type: string, ctor: BookConstructor): void {
    this.registry[type] = ctor;
  }

  create(book: Book, extra?: number): BaseBook {
    const Ctor = this.registry[book.type];
    if (!Ctor) throw new Error(`Invalid book type: ${book.type}`);
    return new Ctor(book, extra);
  }
}