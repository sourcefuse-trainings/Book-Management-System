import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookService } from './services/book.service';
import { Book } from './models/book';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
})
export class App implements OnInit {
  showDashboard = true;

  totalBooks = 0;
  printedBooks = 0;
  ebookBooks = 0;

  constructor(
    private router: Router,
    private bookService: BookService,
  ) {}

  ngOnInit() {
    const existingBooks = this.bookService.getBooks();

    if (existingBooks.length === 0) {
      this.bookService.loadBooks().subscribe((data: Book[]) => {
        this.bookService.setBooks(data);
      });
    }

    this.bookService.books$.subscribe((books: Book[]) => {
      this.totalBooks = books.length;
      this.printedBooks = books.filter((b: Book) => b.type === 'Printed Book').length;
      this.ebookBooks = books.filter((b: Book) => b.type === 'E-Book').length;
    });

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.showDashboard = event.url === '/' || event.url === '';
      }
    });
  }
}
