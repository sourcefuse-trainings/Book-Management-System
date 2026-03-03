import type { Book } from "../types/Book.js";

export abstract class BaseBook {
  title: string;
  isbn: string;
  publication_date: string;
  genre: { id: string; name: string };
  price: number;
  author: { id: string; name: string };
  type: string;

  constructor(book: Book) {
    this.title = book.title;
    this.isbn = book.isbn;
    this.publication_date = book.publication_date;
    this.genre = book.genre;
    this.price = book.price;
    this.author = book.author;
    this.type = book.type;
  }

  abstract getExtraInfo(): string;

  applyDiscount(percent: number): number {
    return +(this.price * (1 - percent / 100)).toFixed(2);
  }

  calculateAge(): number {
    return new Date().getFullYear() - new Date(this.publication_date).getFullYear();
  }
}