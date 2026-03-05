import { Author } from "../types/Author.js";
import { Category } from "../types/Category.js";
export interface IBook {
  title: string;
  author: Author;
  isbn: string;
  publication_date: string;
  genre: Category;
  price: number;
  type: string;
}