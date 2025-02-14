import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MenuComponent} from './components/menu/menu.component';

@Component({
  selector: 'books',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent
  ],
  templateUrl: './books.component.html'
})
export class BooksComponent {

}
