import { BaseBook } from "./BaseBook.js";
export class EBook extends BaseBook {
    constructor(book, fileSize = 5) {
        super(book);
        this.fileSize = fileSize;
    }
    getExtraInfo() {
        return `${this.fileSize} MB`;
    }
}
