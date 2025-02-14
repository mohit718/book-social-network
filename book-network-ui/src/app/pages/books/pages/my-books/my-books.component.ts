import {Component, OnInit} from '@angular/core';
import {BookCardComponent} from '../../components/book-card/book-card.component';
import {NgForOf, NgIf} from '@angular/common';
import {PageResponseBookResponse} from '../../../../models/page-response-book-response';
import {BookService} from '../../../../services/book.service';
import {Router, RouterLink} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {BookResponse} from '../../../../models/book-response';

@Component({
  selector: 'my-book-list',
  standalone: true,
  imports: [
    BookCardComponent,
    NgForOf,
    RouterLink,
    NgIf
  ],
  templateUrl: './my-books.component.html'
})
export class MyBooksComponent implements OnInit{

  bookResponse: PageResponseBookResponse = {};
  page = 0;
  size = 4;
  private message: string = "";
  private error:string = "";

  constructor(
    private bookService: BookService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.findAllBooks();
  }

  private findAllBooks() {
    this.bookService.findAllBooksByOwner(this.page, this.size).subscribe(res => this.bookResponse = res);
  }

  goToLast() {
    this.page = this.totalPages - 1;
    this.findAllBooks();
  }

  goToNext() {
    this.page++;
    this.findAllBooks();
  }

  goToPrevious() {
    this.page--;
    this.findAllBooks();
  }
  goToPage(i: number) {
    this.page = i;
    this.findAllBooks();
  }

  goToFirst() {
    this.page = 0;
    this.findAllBooks();
  }

  get totalPages(): number {
    return this.bookResponse.totalPages as number;
  }

  get isFirstPage(): boolean {
    return this.bookResponse.first as boolean;
  }

  get isLastPage(): boolean {
    return this.bookResponse.last as boolean;
  }

  archiveBook(book: BookResponse) {
    this.bookService.updateArchivedStatus(book.id).subscribe({
      next: (res) => book.archived = !book.archived,
      error: ({error}) => console.log(error)
    });
  }

  shareBook(book: BookResponse) {
    this.bookService.updateShareableStatus(book.id).subscribe({
      next: (res) => book.shareable = !book.shareable,
      error: ({error}) => console.log(error)
    });
  }

  editBook(book: BookResponse) {
    this.router.navigate(['books','manage',book.id]);
  }
}
