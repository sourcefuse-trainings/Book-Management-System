var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { PrintedBook } from "../models/PrintedBook.js";
import { EBook } from "../models/EBook.js";
import { Log } from "../decorators/log.js";
export class BookManager {
    constructor(factory, validator, repository, apiService) {
        this.factory = factory;
        this.validator = validator;
        this.repository = repository;
        this.apiService = apiService;
        this.books = [];
        this.filteredBooks = [];
    }
    getAll() {
        return this.filteredBooks;
    }
    loadFromJSON(data) {
        this.books = data.map((b, i) => i % 2 === 0 ? new PrintedBook(b) : new EBook(b));
        this.filteredBooks = [...this.books];
    }
    async loadFromApi() {
        const books = await this.apiService.fetchBooks();
        this.books = books.map((b, i) => i % 2 === 0 ? new PrintedBook(b) : new EBook(b));
        this.filteredBooks = [...this.books];
    }
    add(bookData) {
        const book = Math.random() > 0.5 ? new PrintedBook(bookData) : new EBook(bookData);
        this.books.push(book);
        this.filteredBooks = [...this.books];
    }
    update(index, bookData) {
        const oldBook = this.filteredBooks[index];
        const realIndex = this.books.indexOf(oldBook);
        const updated = oldBook.type === "Printed"
            ? new PrintedBook(bookData)
            : new EBook(bookData);
        this.books[realIndex] = updated;
        this.filteredBooks = [...this.books];
    }
    delete(index) {
        const book = this.filteredBooks[index];
        this.books = this.books.filter((b) => b !== book);
        this.filteredBooks = [...this.books];
    }
    search(query) {
        const q = query.toLowerCase();
        this.filteredBooks = this.books.filter((b) => b.title.toLowerCase().includes(q) ||
            b.author.name.toLowerCase().includes(q) ||
            b.isbn.includes(q));
    }
    sortByTitle() {
        this.filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
    }
    sortByAuthor() {
        this.filteredBooks.sort((a, b) => a.author.name.localeCompare(b.author.name));
    }
    sortByDate() {
        this.filteredBooks.sort((a, b) => new Date(a.publication_date).getTime() -
            new Date(b.publication_date).getTime());
    }
}
__decorate([
    Log
], BookManager.prototype, "getAll", null);
__decorate([
    Log
], BookManager.prototype, "loadFromJSON", null);
__decorate([
    Log
], BookManager.prototype, "loadFromApi", null);
__decorate([
    Log
], BookManager.prototype, "add", null);
__decorate([
    Log
], BookManager.prototype, "update", null);
__decorate([
    Log
], BookManager.prototype, "delete", null);
__decorate([
    Log
], BookManager.prototype, "search", null);
__decorate([
    Log
], BookManager.prototype, "sortByTitle", null);
__decorate([
    Log
], BookManager.prototype, "sortByAuthor", null);
__decorate([
    Log
], BookManager.prototype, "sortByDate", null);
