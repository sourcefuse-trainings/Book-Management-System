import type { BaseBook } from "../models/BaseBook.js";
import type { IBook } from "../models/IBook.js";

export interface IBookFactory {
  create(book: IBook): BaseBook;
}