import { BaseBook } from "./BaseBook.js";
import { IBook } from "./IBook.js";

export class PrintedBook extends BaseBook {
  pages: number;

  constructor(data: IBook, pages = 300) {
    super(data, "Printed");
    this.pages = pages;
  }

  getExtraInfo(): string {
    return this.pages > 300 ? "Shipping ₹60" : "Shipping ₹40";
  }
}