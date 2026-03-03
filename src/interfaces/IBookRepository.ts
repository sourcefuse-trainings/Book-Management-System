import type { BaseBook } from "../models/BaseBook.js";

export interface IBookRepository {
  add(book: BaseBook): void;
  getAll(): BaseBook[];
  remove(book: BaseBook): void;
}