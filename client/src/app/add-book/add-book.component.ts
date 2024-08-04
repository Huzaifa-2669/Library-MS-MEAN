import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  books: any[] = [];
  booking: Booking = {
    title: '',
    author: '',
    publishedYear: 1850,
    genre: '',
  };

  constructor(private bookservice: BookService, private route: Router) {}

  ngOnInit() {}

  addBooks() {
    this.bookservice
      .addBooks(this.booking)
      .subscribe((response) => console.log('done'));
  }
  goBack() {
    this.route.navigate(['/']);
  }
}
interface Booking {
  title?: string;
  author?: string;
  publishedYear?: number;
  genre?: string;
}
