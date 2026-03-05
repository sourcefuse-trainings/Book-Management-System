import { BaseBook } from "../models/BaseBook.js";
import { PrintedBook } from "../models/PrintedBook.js";
import { EBook } from "../models/EBook.js";
import { IBook } from "../models/IBook.js";
import { IBookOperations } from "../interfaces/IBookOperations.js";
import { Log } from "../decorators/log.js";

import { IBookFactory } from "../interfaces/IBookFactory.js";
import { IBookValidator } from "../interfaces/IBookValidator.js";
import { IBookRepository } from "../interfaces/IBookRepository.js";
import { IApiService } from "../interfaces/IApiService.js";

export class BookManager implements IBookOperations {
  private books: BaseBook[] = [];
  private filteredBooks: BaseBook[] = [];

  constructor(
    private factory: IBookFactory,
    private validator: IBookValidator,
    private repository: IBookRepository,
    private apiService: IApiService,
  ) {}

  @Log
  getAll(): BaseBook[] {
    return this.filteredBooks;
  }

  @Log
  loadFromJSON(data: IBook[]): void {
    this.books = data.map((b, i) =>
      i % 2 === 0 ? new PrintedBook(b) : new EBook(b),
    );

    this.filteredBooks = [...this.books];
  }

  @Log
  async loadFromApi(): Promise<void> {
    const books = await this.apiService.fetchBooks();

    this.books = books.map((b, i) =>
      i % 2 === 0 ? new PrintedBook(b) : new EBook(b),
    );

    this.filteredBooks = [...this.books];
  }

  @Log
  add(bookData: IBook): void {
    const book =
      Math.random() > 0.5 ? new PrintedBook(bookData) : new EBook(bookData);

    this.books.push(book);

    this.filteredBooks = [...this.books];
  }

  @Log
  update(index: number, bookData: IBook): void {
    const oldBook = this.filteredBooks[index];
    const realIndex = this.books.indexOf(oldBook);

    const updated =
      oldBook.type === "Printed"
        ? new PrintedBook(bookData)
        : new EBook(bookData);

    this.books[realIndex] = updated;

    this.filteredBooks = [...this.books];
  }

  @Log
  delete(index: number): void {
    const book = this.filteredBooks[index];

    this.books = this.books.filter((b) => b !== book);

    this.filteredBooks = [...this.books];
  }

  @Log
  search(query: string): void {
    const q = query.toLowerCase();

    this.filteredBooks = this.books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.name.toLowerCase().includes(q) ||
        b.isbn.includes(q),
    );
  }

  @Log
  sortByTitle(): void {
    this.filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
  }

  @Log
  sortByAuthor(): void {
    this.filteredBooks.sort((a, b) =>
      a.author.name.localeCompare(b.author.name),
    );
  }

  @Log
  sortByDate(): void {
    this.filteredBooks.sort(
      (a, b) =>
        new Date(a.publication_date).getTime() -
        new Date(b.publication_date).getTime(),
    );
  }
}
