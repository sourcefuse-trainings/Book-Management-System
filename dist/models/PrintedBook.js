import { BaseBook } from "./BaseBook.js";
export class PrintedBook extends BaseBook {
    constructor(book, pages = 300) {
        super(book);
        this.pages = pages;
    }
    getExtraInfo() {
        return `${this.pages} pages`;
    }
}
