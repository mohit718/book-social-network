import {Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {ActivateAccountComponent} from './pages/activate-account/activate-account.component';
import {BooksComponent} from './pages/books/books.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {AllBooksComponent} from './pages/books/pages/all-books/all-books.component';
import {MyBooksComponent} from './pages/books/pages/my-books/my-books.component';
import {ManageBookComponent} from './pages/books/pages/manage-book/manage-book.component';
import {BorrowedBooksComponent} from './pages/books/pages/borrowed-books/borrowed-books.component';
import {ReturnedBooksComponent} from './pages/books/pages/returned-books/returned-books.component';
import {authGuard} from './services/auth.guard';
import {ProfileComponent} from './pages/profile/profile.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'books', component: BooksComponent, children:[
      {path: '', component: AllBooksComponent},
      {path: 'my-books', component: MyBooksComponent},
      {path: 'manage', component: ManageBookComponent},
      {path: 'manage/:bookId', component: ManageBookComponent},
      {path: 'my-borrowed-books', component: BorrowedBooksComponent},
      {path: 'my-returned-books', component: ReturnedBooksComponent}
  ], canActivate: [authGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'activate-account', component: ActivateAccountComponent},
  {path: 'profile', component: ProfileComponent},
  { path: '**', component: PageNotFoundComponent },
];
