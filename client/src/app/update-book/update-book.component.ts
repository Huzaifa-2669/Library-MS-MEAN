import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from '../services/book.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
  imports: [FormsModule],
  standalone: true,
})
export class UpdateBookComponent implements OnInit {
  bookings: any[] = [];
  booking: Booking = {
    title: '',
    author: '',
    publishedYear: 0,
    genre: '',
    available: false,
  };
  id: number;

  constructor(
    private bookService: BookService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.getBook();
  }
  getBook() {
    this.bookService.getBook(this.id).subscribe((responses) => {
      this.booking = responses;
      console.log('Data Successfully Fetched!');
    });
  }

  updateBooks() {
    this.bookService
      .updateBooks(this.id, this.booking)
      .subscribe((response: Object) => {
        this.bookings = response as any[];
        this.router.navigate(['/books']);
      });
  }
}

interface Booking {
  title?: string;
  author?: string;
  publishedYear?: number;
  genre?: string;
  available?: boolean;
}
