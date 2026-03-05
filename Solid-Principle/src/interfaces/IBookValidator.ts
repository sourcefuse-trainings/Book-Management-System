import type { IBook } from "../models/IBook.js";

export interface IBookValidator {
  validate(book: IBook): void;
}