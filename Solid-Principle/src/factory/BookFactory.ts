import { PrintedBook } from "../models/PrintedBook.js";
import { EBook } from "../models/EBook.js";
import { IBook } from "../models/IBook.js";
import { BaseBook } from "../models/BaseBook.js";
import { IBookFactory } from "../interfaces/IBookFactory.js";

export class BookFactory implements IBookFactory {

  create(book: IBook): BaseBook {

    if (book.type === "Printed") {
      return new PrintedBook(book);
    }

    return new EBook(book);
  }

}