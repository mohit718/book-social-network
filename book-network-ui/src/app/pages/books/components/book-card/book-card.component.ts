import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookResponse} from '../../../../models/book-response';
import {NgIf} from '@angular/common';
import {RatingComponent} from '../rating/rating.component';
import {ImageUtils} from '../../../../utils/ImageUtils';

@Component({
  selector: 'book-card',
  standalone: true,
  imports: [
    NgIf,
    RatingComponent
  ],
  templateUrl: './book-card.component.html'
})
export class BookCardComponent {
  @Input() book!: BookResponse;
  @Input() manage: boolean = false;

  get bookCover() {
    let bookCover = "/images/sample/book-cover.png";
    if (this.book?.cover)
      bookCover = ImageUtils.blobToImage(this.book.cover);
    return bookCover;
  }

  @Output() private borrow: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private details: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private addToWaitingList: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();

  @Output() private edit: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private archive: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private share: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();

  onShowDetails() {
    this.details.emit(this.book);
  }

  onBorrow() {
    this.borrow.emit(this.book);
  }

  onAddToWaitingList() {
    this.addToWaitingList.emit(this.book);
  }

  onEdit() {
    this.edit.emit(this.book);
  }

  onShare() {
    this.share.emit(this.book);
  }

  onArchive() {
    this.archive.emit(this.book);
  }
}
