import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {RatingComponent} from "../../components/rating/rating.component";
import {ReactiveFormsModule} from "@angular/forms";
import {PageResponseBorrowedBookResponse} from '../../../../models/page-response-borrowed-book-response';
import {BorrowedBookResponse} from '../../../../models/borrowed-book-response';
import {FeedbackRequest} from '../../../../models/feedback-request';
import {BookService} from '../../../../services/book.service';
import {ToastrService} from 'ngx-toastr';
import {FeedbackService} from '../../../../services/feedback.service';

@Component({
  selector: 'returned-books',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RatingComponent,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './returned-books.component.html'
})
export class ReturnedBooksComponent {
  returnedBooks: PageResponseBorrowedBookResponse = {};
  selectedBook?: BorrowedBookResponse;
  page = 0;
  size = 10;

  constructor(private bookService: BookService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.findAllReturnedBooks();
  }

  returnBook(withFeedback: boolean) {
    if (this.selectedBook) {
      this.bookService.returnBook(this.selectedBook.id).subscribe({
        next: () => {
          this.selectedBook = undefined;
          this.toastr.success("Book returned.");
          this.findAllReturnedBooks();
        },
        error: ({error}) => this.toastr.error(error.toString(), "Book not returned.")
      });
    }
  }

  approveReturn(book: BorrowedBookResponse) {
    if(book.returned){
      this.bookService.approveReturn(book.id).subscribe({
        next: ()=> {
          this.toastr.success("Return approved.");
          this.findAllReturnedBooks();
        },
        error: ({error})=> this.toastr.error(error.toString(), "Unable to approve.")
      });
    }
  }

  private findAllReturnedBooks() {
    this.bookService.findAllReturnedBooks(this.page, this.size).subscribe({
      next: (books) => {
        this.returnedBooks = books;
        console.log(this.returnedBooks.content);
      },
      error: ({error}) => console.log(error)
    })
  }

  goToLast() {
    this.page = this.totalPages - 1;
    this.findAllReturnedBooks();
  }

  goToNext() {
    this.page++;
    this.findAllReturnedBooks();
  }

  goToPrevious() {
    this.page--;
    this.findAllReturnedBooks();
  }

  goToPage(i: number) {
    this.page = i;
    this.findAllReturnedBooks();
  }

  goToFirst() {
    this.page = 0;
    this.findAllReturnedBooks();
  }

  get totalPages(): number {
    return this.returnedBooks.totalPages as number;
  }

  get isFirstPage(): boolean {
    return this.returnedBooks.first as boolean;
  }

  get isLastPage(): boolean {
    return this.returnedBooks.last as boolean;
  }
}
