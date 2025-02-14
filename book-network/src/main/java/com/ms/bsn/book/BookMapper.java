package com.ms.bsn.book;

import com.ms.bsn.file.FileUtils;
import com.ms.bsn.history.BookTransactionHistory;

public class BookMapper {
    public static Book toBook(BookRequest request){
        return Book.builder()
            .id(request.id())
            .title(request.title())
            .authorName(request.authorName())
            .isbn(request.isbn())
            .synopsis(request.synopsis())
            .archived(request.archived() != null && request.archived())
            .shareable(request.shareable() != null && request.shareable())
            .build();
    }

    public static BookResponse toBookResponse(Book book) {
        return BookResponse.builder()
            .id(book.getId())
            .title(book.getTitle())
            .authorName(book.getAuthorName())
            .isbn(book.getIsbn())
            .synopsis(book.getSynopsis())
            .rating(book.getAverageRating())
            .archived(book.getArchived())
            .shareable(book.getShareable())
            .owner(book.getOwner().getFullName())
            .cover(FileUtils.readFileFromPath(book.getBookCover()))
            .build();
    }

    public static BorrowedBookResponse toBorrowedBookResponse(BookTransactionHistory bookHistory) {
        Book book = bookHistory.getBook();
        return BorrowedBookResponse.builder()
            .id(book.getId())
            .title(book.getTitle())
            .authorName(book.getAuthorName())
            .isbn(book.getIsbn())
            .rating(book.getAverageRating())
            .returned(bookHistory.getReturned())
            .returnApproved(bookHistory.getReturnApproved())
            .build();
    }
}
