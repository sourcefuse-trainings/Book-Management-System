import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
})
export class BookFormComponent {
  title: string = '';
  author: string = '';

  @Output() addBook = new EventEmitter<{ title: string; author: string }>();

  submitBook() {
    if (this.title && this.author) {
      this.addBook.emit({ title: this.title, author: this.author });
      this.title = '';
      this.author = '';
    }
  }
}
