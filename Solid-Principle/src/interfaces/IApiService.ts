import type { IBook } from "../models/IBook.js";

export interface IApiService {
  fetchBooks(): Promise<IBook[]>;
}