import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../models/book';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DiscountPipe } from '../pipes/discount.pipe';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, DiscountPipe],
  templateUrl: './book-list.html',
  styleUrls: ['./book-list.css'],
})
export class BookList implements OnInit {
  books: Book[] = [];
  selectedBook: Book | null = null;

  constructor(
    private bookService: BookService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.bookService.books$.subscribe((data: Book[]) => {
      this.books = data;
    });

    if (this.bookService.getBooks().length === 0) {
      this.bookService.loadBooks().subscribe((data: Book[]) => {
        this.bookService.setBooks(data);
      });
    }
  }

  viewBook(book: Book) {
    this.selectedBook = this.selectedBook === book ? null : book;
  }

  closeView() {
    this.selectedBook = null;
  }

  editBook(index: number) {
    const book = this.books[index];
    this.bookService.setEditBook(book, index);
    this.router.navigate(['/add-book']);
  }

  deleteBook(index: number) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(index);
    }
  }
}
