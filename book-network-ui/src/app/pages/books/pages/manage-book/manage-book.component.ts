import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {BookRequest} from '../../../../models/book-request';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {BookService} from '../../../../services/book.service';
import {BookResponse} from '../../../../models/book-response';
import {ImageUtils} from '../../../../utils/ImageUtils';

@Component({
  selector: 'manage-book',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage,
    NgForOf,
    FormsModule,
    RouterLink
  ],
  templateUrl: './manage-book.component.html'
})
export class ManageBookComponent implements OnInit {
  errorMsg: string[] = [];
  bookCover: string = '/images/sample/book-cover.png';
  selectedBookCover?: File;
  bookRequest: BookRequest = {title: '', authorName: '', isbn: '', synopsis: '', shareable: true};

  constructor(private bookService: BookService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const bookId = this.activatedRoute.snapshot.params['bookId']
    if (bookId) {
      this.bookService.findBookById(bookId).subscribe({
        next: (book: BookResponse) => {
          this.bookRequest = {
            id: book.id,
            title: book.title as string,
            isbn: book.isbn as string,
            authorName: book.authorName as string,
            synopsis: book.synopsis as string,
            shareable: book.shareable
          };
          if (book.cover)
            this.bookCover = ImageUtils.blobToImage(book.cover);
        },
        error: (err) => this.router.navigate(["/books/manage"])
      });
    }
  }


  onFileSelect(e: Event) {
    const element = e.currentTarget as HTMLInputElement;
    this.selectedBookCover = element?.files?.[0];
    if (this.selectedBookCover) {
      const reader = new FileReader();
      reader.onload = () => this.bookCover = reader.result as string;
      reader.readAsDataURL(this.selectedBookCover);
    }
  }

  saveBook() {
    this.bookService.saveBook(this.bookRequest).subscribe({
      next: (bookId: number) => {
        if (this.selectedBookCover) {
          this.bookService.saveBookCover(bookId, this.selectedBookCover).subscribe({
            next: () => this.router.navigate(['/books/my-books']),
          })
        }
      },
      error: ({error}: any) => {
        if (error?.validationErrors)
          this.errorMsg = error.validationErrors;
        else
          this.errorMsg = error?.error;
      }
    });
  }
}
