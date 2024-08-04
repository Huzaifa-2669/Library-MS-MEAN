import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
  imports: [ReactiveFormsModule, HttpClientModule, NgIf],
  standalone: true,
})
export class AddBookComponent implements OnInit {
  addBookForm: FormGroup;
  successMessage: string | null = null;
  addedBook: any = null;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) {
    this.addBookForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      publishedYear: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{4}$')],
      ],
      genre: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  get f() {
    return this.addBookForm.controls;
  }

  validateField(field: string) {
    if (
      this.addBookForm.get(field)?.invalid &&
      (this.addBookForm.get(field)?.dirty ||
        this.addBookForm.get(field)?.touched)
    ) {
      return true;
    }
    return false;
  }

  addBooks() {
    if (this.addBookForm.invalid) {
      return;
    }

    this.bookService.addBooks(this.addBookForm.value).subscribe(
      (response) => {
        this.successMessage = 'Book added successfully!';
        this.addedBook = response;
        this.addBookForm.reset();
      },
      (error) => {
        this.successMessage = null;
        console.error('Error adding book', error);
      }
    );
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
