import type { IBookRepository } from "../interfaces/IBookRepository.js";
import type { BaseBook } from "../models/BaseBook.js";

export class Repository<T extends BaseBook> implements IBookRepository {
  protected items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return [...this.items];
  }

  remove(item: T): void {
    this.items = this.items.filter(i => i !== item);
  }
}