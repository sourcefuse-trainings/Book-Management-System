// Importing required modules
import "reflect-metadata";

// Interface Definitions
interface Book {
  id: number;
  title: string;
  authorId: number;
  categoryId: number;
  publishedYear: number;
}

interface Author {
  id: number;
  name: string;
  birthYear: number;
}

interface Category {
  id: number;
  name: string;
}

// Generic Service for CRUD Operations
class DataService<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
    console.log("Item added:", item);
  }

  getAll(): T[] {
    return this.items;
  }

  findById(id: number): T | undefined {
    return this.items.find(item => (item as any).id === id);
  }

  deleteById(id: number): void {
    this.items = this.items.filter(item => (item as any).id !== id);
    console.log(`Item with ID ${id} deleted.`);
  }
}

// Decorator for Logging
function LogExecution(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Executing: ${propertyKey} with arguments:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Execution of ${propertyKey} completed.`);
    return result;
  };
}

// Book Management System
class BookManagementSystem {
  private bookService = new DataService<Book>();
  private authorService = new DataService<Author>();
  private categoryService = new DataService<Category>();

  
  addBook(book: Book): void {
    this.bookService.add(book);
  }

   
  addAuthor(author: Author): void {
    this.authorService.add(author);
  }

  
  addCategory(category: Category): void {
    this.categoryService.add(category);
  }

  getAllBooks(): Book[] {
    return this.bookService.getAll();
  }

  getAllAuthors(): Author[] {
    return this.authorService.getAll();
  }

  getAllCategories(): Category[] {
    return this.categoryService.getAll();
  }

  
  findBookById(id: number): Book | undefined {
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
