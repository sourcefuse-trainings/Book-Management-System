import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../models/book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  books: Book[] = [];
  isDashboard: any;

  constructor(private bookService: BookService) {}
  ngOnInit() {
    const existingBooks = this.bookService.getBooks();

    if (existingBooks.length > 0) {
      this.books = existingBooks;
    } else {
      this.bookService.loadBooks().subscribe((data) => {
        this.bookService.setBooks(data);
        this.books = data;
      });
    }
  }
}
