import { PrintedBook } from "../models/PrintedBook.js";
import { EBook } from "../models/EBook.js";
export class BookFactory {
    create(book) {
        if (book.type === "Printed") {
            return new PrintedBook(book);
        }
        return new EBook(book);
    }
}
