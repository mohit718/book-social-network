import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {PageResponseBookResponse} from '../models/page-response-book-response';
import {HttpClient} from '@angular/common/http';
import {BookRequest} from '../models/book-request';
import {BookResponse} from '../models/book-response';
import {PageResponseBorrowedBookResponse} from '../models/page-response-borrowed-book-response';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  findAllBooks(page: number, size: number): Observable<PageResponseBookResponse> {
    return this.http.get<PageResponseBookResponse>(`http://localhost:8080/api/books?page=${page}&size=${size}`);
  }

  borrowBook(bookId: number): Observable<any> {
    return this.http.post(`http://localhost:8080/api/books/borrow/${bookId}`, {});
  }

  findAllBooksByOwner(page: number, size: number) {
    return this.http.get<PageResponseBookResponse>(`http://localhost:8080/api/books/owner?page=${page}&size=${size}`);
  }

  saveBook(bookRequest: BookRequest) {
      return this.http.post<number>(`http://localhost:8080/api/books`, bookRequest);
  }

  saveBookCover(bookId: number, bookCover: File) {
    var formParams = new FormData();
    formParams.append('file',bookCover);
    return this.http.post(`http://localhost:8080/api/books/cover/${bookId}`, formParams);
  }

  findBookById(bookId: number) {
    return this.http.get<BookResponse>(`http://localhost:8080/api/books/${bookId}`);
  }

  updateShareableStatus(bookId: number) {
    return this.http.patch<number>(`http://localhost:8080/api/books/shareable/${bookId}`, {});
  }

  updateArchivedStatus(bookId: number) {
    return this.http.patch<number>(`http://localhost:8080/api/books/archived/${bookId}`, {});
  }

  findAllBorrowedBooks(page: number, size: number) {
    return this.http.get<PageResponseBorrowedBookResponse>(`http://localhost:8080/api/books/borrowed?page=${page}&size=${size}`);
  }

  returnBook(bookId: number) {
    return this.http.patch(`http://localhost:8080/api/books/return/${bookId}`, {});
  }

  approveReturn(bookId: number) {
    return this.http.patch(`http://localhost:8080/api/books/return/approve/${bookId}`, {});
  }

  findAllReturnedBooks(page: number, size: number) {
    return this.http.get<PageResponseBorrowedBookResponse>(`http://localhost:8080/api/books/returned?page=${page}&size=${size}`);
  }
}
