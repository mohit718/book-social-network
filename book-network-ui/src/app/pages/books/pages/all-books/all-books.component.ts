import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BookService} from '../../../../services/book.service';
import {PageResponseBookResponse} from '../../../../models/page-response-book-response';
import {NgClass, NgForOf} from '@angular/common';
import {BookCardComponent} from '../../components/book-card/book-card.component';
import {BookResponse} from '../../../../models/book-response';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'book-list',
  standalone: true,
  imports: [
    NgForOf,
    BookCardComponent,
    NgClass
  ],
  templateUrl: './all-books.component.html'
})
export class AllBooksComponent implements OnInit {

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
    this.bookService.findAllBooks(this.page, this.size).subscribe(res => this.bookResponse = res);
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

  borrowBook(book: BookResponse) {
    this.bookService.borrowBook(book.id as number).subscribe({
      next: (res) => this.toastr.success("Check My Borrowed List","Book borrowed successfully."),
      error: (err:any)=> this.toastr.error("Borrow failed!.", err?.error?.error)
    });
  }
}
