import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  books: { title: string; author: string }[] = [];

  onAddBook(book: { title: string; author: string }) {
    this.books.push(book);
  }
}
