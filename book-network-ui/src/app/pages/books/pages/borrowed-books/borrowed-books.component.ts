import {Component, ElementRef, OnInit, ViewChild, viewChild} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {BorrowedBookResponse} from '../../../../models/borrowed-book-response';
import {PageResponseBorrowedBookResponse} from '../../../../models/page-response-borrowed-book-response';
import {BookService} from '../../../../services/book.service';
import {ToastrService} from 'ngx-toastr';
import {RatingComponent} from '../../components/rating/rating.component';
import {FormsModule} from '@angular/forms';
import {FeedbackRequest} from '../../../../models/feedback-request';
import {FeedbackService} from '../../../../services/feedback.service';

@Component({
  selector: 'borrowed-books',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass,
    RatingComponent,
    FormsModule
  ],
  templateUrl: './borrowed-books.component.html'
})
export class BorrowedBooksComponent implements OnInit {
  @ViewChild("feedbackModal") feedbackModal!: ElementRef;
  borrowedBooks: PageResponseBorrowedBookResponse = {};
  selectedBook?: BorrowedBookResponse;
  feedbackRequest: FeedbackRequest = {bookId:-1, comments: '', rating:0.0};
  page = 0;
  size = 10;


  constructor(private bookService: BookService, private toastr: ToastrService, private feedbackService: FeedbackService) {
  }

  ngOnInit(): void {
    this.findAllBorrowedBooks();
  }

  openFeedbackModal(book: BorrowedBookResponse) {
    this.selectedBook = book;
    this.feedbackRequest.bookId = book.id;
    this.feedbackModal.nativeElement.classList.add("d-block");
    // this.feedbackModal.nativeElement.classList.add("show");
  }

  returnBook(withFeedback: boolean) {
    if (this.selectedBook) {
      this.bookService.returnBook(this.selectedBook.id).subscribe({
        next: () => {
          if (withFeedback)
            this.giveFeedback();
          this.selectedBook = undefined;
          this.toastr.success("Book returned.");
          this.findAllBorrowedBooks();
        },
        error: ({error}) => this.toastr.error(error.toString(), "Book not returned.")
      });
    }
  }

  private giveFeedback() {
    if (this.feedbackRequest) {
      this.feedbackService.saveFeedback(this.feedbackRequest).subscribe({
        next: () => {
          this.toastr.success("Feedback saved.");
        }
      });
    }
  }

  private findAllBorrowedBooks() {
    this.bookService.findAllBorrowedBooks(this.page, this.size).subscribe({
      next: (books) => {
        this.borrowedBooks = books;
        console.log(this.borrowedBooks.content);
      },
      error: ({error}) => console.log(error)
    })
  }

  goToLast() {
    this.page = this.totalPages - 1;
    this.findAllBorrowedBooks();
  }

  goToNext() {
    this.page++;
    this.findAllBorrowedBooks();
  }

  goToPrevious() {
    this.page--;
    this.findAllBorrowedBooks();
  }

  goToPage(i: number) {
    this.page = i;
    this.findAllBorrowedBooks();
  }

  goToFirst() {
    this.page = 0;
    this.findAllBorrowedBooks();
  }

  get totalPages(): number {
    return this.borrowedBooks.totalPages as number;
  }

  get isFirstPage(): boolean {
    return this.borrowedBooks.first as boolean;
  }

  get isLastPage(): boolean {
    return this.borrowedBooks.last as boolean;
  }

  closeFeedbackModal() {
    this.feedbackModal.nativeElement.classList.remove("d-block");
    // this.feedbackModal.nativeElement.classList.remove("show");
  }


}
