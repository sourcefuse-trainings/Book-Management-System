import { BaseBook } from "../models/BaseBook.js";
import { IBook } from "../models/IBook.js";

export interface IBookOperations {
  add(book: IBook): void;
  update(index: number, book: IBook): void;
  delete(index: number): void;
  getAll(): BaseBook[];
}