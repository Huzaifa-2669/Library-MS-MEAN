import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BookListComponent } from './book-list/book-list.component';
import { AddBookComponent } from './add-book/add-book.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { AssignBookComponent } from './assign-book/assign-book.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'books', component: BookListComponent },
  { path: 'add-book', component: AddBookComponent },
  { path: 'update-book/:id', component: UpdateBookComponent },
  { path: 'borrow-book/', component: AssignBookComponent },
];
