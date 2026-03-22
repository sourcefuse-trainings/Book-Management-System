import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'add-book',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-book.html',
})
export class AddBook implements OnInit {

  bookForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit() {

    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', Validators.required],
      publicationDate: ['', Validators.required],
      genre: ['', Validators.required],
      price: [0, Validators.required],
      type: ['', Validators.required]
    });

    const editData = this.bookService.getEditBook();
    if (editData) {
      this.bookForm.patchValue(editData);
      this.isEditMode = true;
    }

    // ✅ RxJS
    this.bookForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        console.log('Optimized Value:', value);
      });
  }

  onSubmit() {
    if (this.bookForm.invalid) return;

    const book = this.bookForm.value;

    if (this.isEditMode) {
      this.bookService.updateBook(book);
    } else {
      this.bookService.addBook(book);
    }

    this.router.navigate(['/book-list']);
  }
}