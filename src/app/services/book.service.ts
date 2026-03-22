import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private books: Book[] = [];

  private booksSubject = new BehaviorSubject<Book[]>([]);
  books$ = this.booksSubject.asObservable();

  private editBookData: Book | null = null;
  private editIndex: number = -1;

  constructor(private http: HttpClient) {}

  loadBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('assets/books.json');
  }

  setBooks(data: Book[]) {
    this.books = data;
    this.booksSubject.next(this.books);
  }

  getBooks(): Book[] {
    return this.books;
  }

  addBook(book: Book) {
    this.books.push(book);
    this.booksSubject.next(this.books);
  }

  deleteBook(index: number) {
    this.books.splice(index, 1);
    this.booksSubject.next(this.books);
  }

  setEditBook(book: Book, index: number) {
    this.editBookData = book;
    this.editIndex = index;
  }

  getEditBook() {
    return this.editBookData;
  }

  getEditIndex() {
    return this.editIndex;
  }

  updateBook(updatedBook: Book) {
    if (this.editIndex > -1) {
      this.books[this.editIndex] = updatedBook;
      this.booksSubject.next(this.books);
      this.clearEditState();
    }
  }

  clearEditState() {
    this.editIndex = -1;
    this.editBookData = null;
  }
}
