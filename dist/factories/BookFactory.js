import { PrintedBook } from "../models/PrintedBook.js";
import { EBook } from "../models/EBook.js";
export class BookFactory {
    constructor() {
        this.registry = {
            Printed: PrintedBook,
            "E-Book": EBook
        };
    }
    registerType(type, ctor) {
        this.registry[type] = ctor;
    }
    create(book, extra) {
        const Ctor = this.registry[book.type];
        if (!Ctor)
            throw new Error(`Invalid book type: ${book.type}`);
        return new Ctor(book, extra);
    }
}
