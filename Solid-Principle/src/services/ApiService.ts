import type { IApiService } from "../interfaces/IApiService.js";
import type { IBook } from "../models/IBook.js";

export class ApiService implements IApiService {

  async fetchBooks(): Promise<IBook[]> {

    const res = await fetch(
      "https://fakerapi.it/api/v1/books?_quantity=10"
    );

    const data = await res.json();

    return data.data.map((b: any) => ({
      title: b.title,
      isbn: b.isbn,
      publication_date: b.published,
      author: b.author,
      price: Number(b.price),
      type: "Printed"
    }));
  }
}