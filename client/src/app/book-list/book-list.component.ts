// import { Component, OnInit } from '@angular/core';
// import { BookService } from '../services/book.service';
// import { Observable } from 'rxjs';
// import { Router } from '@angular/router';
// import { NgForOf } from '@angular/common';

// @Component({
//   selector: 'app-book-list',
//   templateUrl: './book-list.component.html',
//   styleUrls: ['./book-list.component.css'],
//   imports: [NgForOf],
//   standalone: true,
// })
// export class BookListComponent implements OnInit {
//   books: any[] = [];
//   booking: Booking = {
//     title: '',
//     author: '',
//     publishedYear: 0,
//     genre: '',
//     available: false,
//   };
//   constructor(private bookService: BookService, private route: Router) {
//     this.loadBooks();
//     this.getBooks();
//   }

//   ngOnInit(): void {
//     this.getBooks();
//     this.loadBooks();
//   }

//   loadBooks(): void {
//     this.bookService.getBooks().subscribe((data: any) => {
//       console.log(data);
//       this.books = data;
//     });
//   }
//   toLink(id: number) {
//     this.route.navigate(['update-book/', id]);
//   }

//   deleteBook(id: string): void {}

//   getBooks() {
//     this.bookService.getBooks().subscribe((responses: any) => {
//       this.booking = responses;
//       console.log('Data Successfully Fetched!', this.books);
//     });
//   }
// }

// interface Booking {
//   title?: string;
//   author?: string;
//   publishedYear?: number;
//   genre?: string;
//   available?: boolean;
// }

import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  imports: [NgForOf],
  standalone: true,
})
export class BookListComponent implements OnInit {
  booking: Booking[] = []; // Change to an array

  constructor(private bookService: BookService, private route: Router) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks().subscribe((responses: Object) => {
      this.booking = responses as Booking[];
      console.log('Data Successfully Fetched!', this.booking);
    });
  }

  toLink(id: number) {
    // Change the type to string
    this.route.navigate(['update-book/', id]);
  }

  deleteBook(id: number) {
    this.bookService.deleteBooks(id).subscribe(() => {
      this.getBooks();
    });
  }
}

interface Booking {
  _id: number;
  title: string;
  author: string;
  publishedYear: number;
  genre: string;
  available: boolean;
}
