import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient, public router: Router) {}

  getBook(id: number) {
    return this.http.get(`/book-list` + '/' + id);
  }

  getBooks() {
    return this.http.get(`/book-list`);
  }
  addBooking(book: any) {
    return this.http.post(`/add-book/`, book);
  }

  assignBook(book: any) {
    return this.http.post(`/assign-book/`, book);
  }

  deleteBooks(id: number) {
    console.log(id);
    return this.http.delete(`/book-list` + '/' + id);
  }
  updateBooks(id: number, info: any) {
    this.router.navigate(['/book-list']);

    return this.http.put(`book-list` + '/' + id, info);
  }
}
