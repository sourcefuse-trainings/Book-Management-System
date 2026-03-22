import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },

  {
    path: 'home',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },

  {
    path: 'add-book',
    loadComponent: () => import('./add-book/add-book').then((m) => m.AddBook),
  },

  {
    path: 'book-list',
    loadComponent: () => import('./book-list/book-list').then((m) => m.BookList),
  },

  {
    path: '**',
    redirectTo: '',
  },
];
