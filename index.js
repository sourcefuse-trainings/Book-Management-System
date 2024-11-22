"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importing required modules
require("reflect-metadata");
// Generic Service for CRUD Operations
class DataService {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
        console.log("Item added:", item);
    }
    getAll() {
        return this.items;
    }
    findById(id) {
        return this.items.find(item => item.id === id);
    }
    deleteById(id) {
        this.items = this.items.filter(item => item.id !== id);
        console.log(`Item with ID ${id} deleted.`);
    }
}
// Decorator for Logging
function LogExecution(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`Executing: ${propertyKey} with arguments:`, args);
        const result = originalMethod.apply(this, args);
        console.log(`Execution of ${propertyKey} completed.`);
        return result;
    };
}
// Book Management System
class BookManagementSystem {
    constructor() {
        this.bookService = new DataService();
        this.authorService = new DataService();
        this.categoryService = new DataService();
    }
    addBook(book) {
        this.bookService.add(book);
    }
    addAuthor(author) {
        this.authorService.add(author);
    }
    addCategory(category) {
        this.categoryService.add(category);
    }
    getAllBooks() {
        return this.bookService.getAll();
    }
    getAllAuthors() {
        return this.authorService.getAll();
    }
    getAllCategories() {
        return this.categoryService.getAll();
    }
    findBookById(id) {
        return this.bookService.findById(id);
    }
}
// Instantiate and Use the BMS
const bms = new BookManagementSystem();
// Adding Authors
bms.addAuthor({ id: 1, name: "J.K. Rowling", birthYear: 1965 });
bms.addAuthor({ id: 2, name: "George R.R. Martin", birthYear: 1948 });
// Adding Categories
bms.addCategory({ id: 1, name: "Fantasy" });
bms.addCategory({ id: 2, name: "Science Fiction" });
// Adding Books
bms.addBook({ id: 1, title: "Harry Potter", authorId: 1, categoryId: 1, publishedYear: 1997 });
bms.addBook({ id: 2, title: "A Song of Ice and Fire", authorId: 2, categoryId: 1, publishedYear: 1996 });
// Retrieving Data
console.log("All Books:", bms.getAllBooks());
console.log("All Authors:", bms.getAllAuthors());
console.log("All Categories:", bms.getAllCategories());
// Finding a Book by ID
console.log("Book with ID 1:", bms.findBookById(1));
