import type { BaseBook } from "../models/BaseBook.js";
import type { Book } from "../types/Book.js";
import type { IBookFactory } from "../interfaces/IBookFactory.js";
import type { IBookValidator } from "../interfaces/IBookValidator.js";
import type { IBookRepository } from "../interfaces/IBookRepository.js";

export class BookManager {
  private filtered: BaseBook[] = [];

  constructor(
    private factory: IBookFactory,
    private validator: IBookValidator,
    private repository: IBookRepository
  ) {}

  getAllFiltered(): BaseBook[] {
    return this.filtered;
  }

  loadFromJSON(data: Book[]): void {
    data.forEach(book => {
      this.validator.validate(book);
      this.repository.add(this.factory.create(book));
    });
    this.filtered = [...this.repository.getAll()];
  }

  addBook(book: Book, extra: number): void {
    this.validator.validate(book);
    const newBook = this.factory.create(book, extra);
    this.repository.add(newBook);
    this.filtered = [...this.repository.getAll()];
  }

  update(index: number, book: Book, extra: number): void {
    const oldBook = this.filtered[index];
    if (!oldBook) return;
    const items = this.repository.getAll();
    const realIndex = items.indexOf(oldBook);
    if (realIndex === -1) return;

    this.validator.validate(book);
    const newBook = this.factory.create(book, extra);
    items[realIndex] = newBook;

    this.filtered = [...items];
  }

  deleteByIndex(index: number): void {
    const book = this.filtered[index];
    if (!book) return;
    this.repository.remove(book);
    this.filtered = [...this.repository.getAll()];
  }

  search(query: string): void {
    const q = query.trim().toLowerCase();
    this.filtered = q
      ? this.repository.getAll().filter(
          b =>
            b.title.toLowerCase().includes(q) ||
            b.author.name.toLowerCase().includes(q) ||
            b.isbn.includes(q)
        )
      : [...this.repository.getAll()];
  }

  sortByTitle(): void {
    this.filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  sortByAuthor(): void {
    this.filtered.sort((a, b) => a.author.name.localeCompare(b.author.name));
  }

  sortByDate(): void {
    this.filtered.sort(
      (a, b) =>
        new Date(a.publication_date).getTime() -
        new Date(b.publication_date).getTime()
    );
  }
}