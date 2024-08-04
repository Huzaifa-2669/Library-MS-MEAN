import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assign-book',
  templateUrl: './assign-book.component.html',
  styleUrl: './assign-book.component.css',
  standalone: true,
  imports: [NgForOf, FormsModule, NgIf],
})
export class AssignBookComponent implements OnInit {
  books: Booking[] = [];
  booking: Booking = {};

  constructor(private bookService: BookService, private route: Router) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks().subscribe((responses: Booking[] | Object) => {
      this.books = responses as Booking[];
      console.log('Data Successfully Fetched!', this.books);
    });
  }

  addAssignBooks() {
    this.bookService.changeAvailability(this.booking).subscribe(
      (response) => this.route.navigate(['/books'])
      // console.log("done")
    );
  }

  isBookAvailable(title: string) {
    const book = this.books.find((book) => book.title === title);
    return book ? book.available : false;
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
  available?: boolean;
}
