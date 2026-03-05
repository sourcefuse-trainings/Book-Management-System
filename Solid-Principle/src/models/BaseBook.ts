import type { IBook } from "./IBook.js";
import type { Author } from "../types/Author.js";
import type { Category } from "../types/Category.js";

export abstract class BaseBook implements IBook {

  title: string;
  author: Author;
  isbn: string;
  publication_date: string;
  genre: Category;
  price: number;
  type: string;

  constructor(data: IBook, type: string) {
    this.title = data.title;
    this.author = data.author;
    this.isbn = data.isbn;
    this.publication_date = data.publication_date;
    this.genre = data.genre;
    this.price = data.price ?? 0;
    this.type = type;
  }

  calculateAge(): string {
    const d = new Date(this.publication_date);
    const t = new Date();

    let age = t.getFullYear() - d.getFullYear();

    if (
      t.getMonth() < d.getMonth() ||
      (t.getMonth() === d.getMonth() && t.getDate() < d.getDate())
    ) {
      age--;
    }

    return age <= 0 ? "New" : `${age} yrs`;
  }

  applyDiscount(percent: number): number {
    return +(this.price - (this.price * percent) / 100).toFixed(2);
  }

  abstract getExtraInfo(): string;
}