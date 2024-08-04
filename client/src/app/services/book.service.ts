import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient, public router: Router) {}

  getBook(id: number) {
    return this.http.get('http://localhost:5000/' + id);
  }

  getBooks() {
    return this.http.get('http://localhost:5000/');
  }
  addBooks(book: any) {
    return this.http.post('http://localhost:5000/addbook/', book);
  }

  assignBook(book: any) {
    return this.http.post('http://localhost:5000/availability', book);
  }

  changeAvailability(book: any) {
    return this.http.put('http://localhost:5000/availability', book);
  }

  deleteBooks(id: number) {
    console.log(id);
    return this.http.delete('http://localhost:5000/' + id);
  }
  updateBooks(id: number, info: any) {
    return this.http.put('http://localhost:5000/' + id, info);
  }
}
