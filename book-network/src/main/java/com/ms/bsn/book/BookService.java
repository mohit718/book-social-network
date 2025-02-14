package com.ms.bsn.book;

import com.ms.bsn.common.PageResponse;
import com.ms.bsn.exception.OperationNotPermitedException;
import com.ms.bsn.file.FileStorageService;
import com.ms.bsn.history.BookTransactionHistory;
import com.ms.bsn.history.BookTransactionHistoryRepository;
import com.ms.bsn.user.User;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;

import static com.ms.bsn.book.BookSpecification.withOwnerId;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final BookTransactionHistoryRepository transactionRepository;
    private final FileStorageService fileStorageService;

    public Integer save(@Valid BookRequest request, Authentication auth) {
        User user = (User) auth.getPrincipal();
        Book book = BookMapper.toBook(request);
        book.setOwner(user);
        return bookRepository.save(book).getId();
    }

    public BookResponse findById(Integer id) {
        return bookRepository.findById(id).map(BookMapper::toBookResponse).orElseThrow(() -> new EntityNotFoundException("No book found with id " + id));
    }

    public PageResponse<BookResponse> findAllBooks(int page, int size, Authentication auth) {
        User user = (User) auth.getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Book> books = bookRepository.findAllDisplayableBooks(pageable, user.getId());
        List<BookResponse> bookResponse = books.stream().map(BookMapper::toBookResponse).toList();
        return new PageResponse<>(
            bookResponse,
            books.getNumber(),
            books.getSize(),
            books.getTotalElements(),
            books.getTotalPages(),
            books.isFirst(),
            books.isLast()
        );
    }

    public PageResponse<BookResponse> findAllBooksByOwner(int page, int size, Authentication auth) {
        User user = (User) auth.getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Book> books = bookRepository.findAll(withOwnerId(user.getId()), pageable);
        List<BookResponse> bookResponse = books.stream().map(BookMapper::toBookResponse).toList();
        return new PageResponse<>(
            bookResponse,
            books.getNumber(),
            books.getSize(),
            books.getTotalElements(),
            books.getTotalPages(),
            books.isFirst(),
            books.isLast()
        );
    }

    public PageResponse<BorrowedBookResponse> findAllBorrowedBooks(int page, int size, Authentication auth) {
        User user = (User) auth.getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<BookTransactionHistory> borrowedBooks =  transactionRepository.findAllBorrowedBooks(pageable, user.getId());
        List<BorrowedBookResponse> bookResponse = borrowedBooks.stream().map(BookMapper::toBorrowedBookResponse).toList();
        return new PageResponse<>(
            bookResponse,
            borrowedBooks.getNumber(),
            borrowedBooks.getSize(),
            borrowedBooks.getTotalElements(),
            borrowedBooks.getTotalPages(),
            borrowedBooks.isFirst(),
            borrowedBooks.isLast()
        );
    }

    public PageResponse<BorrowedBookResponse> findAllReturnedBooks(int page, int size, Authentication auth) {
        User user = (User) auth.getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<BookTransactionHistory> borrowedBooks =  transactionRepository.findAllReturnedBooks(pageable, user.getId());
        List<BorrowedBookResponse> bookResponse = borrowedBooks.stream().map(BookMapper::toBorrowedBookResponse).toList();
        return new PageResponse<>(
            bookResponse,
            borrowedBooks.getNumber(),
            borrowedBooks.getSize(),
            borrowedBooks.getTotalElements(),
            borrowedBooks.getTotalPages(),
            borrowedBooks.isFirst(),
            borrowedBooks.isLast()
        );
    }

    public Integer updateShareableStatus(Integer bookId, Authentication auth) {
        Book book = bookRepository.findById(bookId).orElseThrow(()->new EntityNotFoundException("No book found of id: "+bookId));
        User user = (User) auth.getPrincipal();
        if(!Objects.equals(user.getId(),book.getOwner().getId()))
            throw new OperationNotPermitedException("You are not permitted to update the book you do not own.");
        book.setShareable(!book.getShareable());
        return bookRepository.save(book).getId();
    }

    public Integer updateArchivedStatus(Integer bookId, Authentication auth) {
        Book book = bookRepository.findById(bookId).orElseThrow(()->new EntityNotFoundException("No book found of id: "+bookId));
        User user = (User) auth.getPrincipal();
        if(!Objects.equals(user.getId(),book.getOwner().getId()))
            throw new OperationNotPermitedException("You are not permitted to update the book you do not own.");
        book.setArchived(!book.getArchived());
        return bookRepository.save(book).getId();
    }

    public Integer borrowBook(Integer bookId, Authentication auth) {
        Book book = bookRepository.findById(bookId).orElseThrow(()->new EntityNotFoundException("No book found of id: "+bookId));
        if(book.getArchived() || !book.getShareable())
            throw new OperationNotPermitedException("You are not permitted to borrow the book that is not shareable or archived.");

        User user = (User) auth.getPrincipal();
        if(Objects.equals(user.getId(),book.getOwner().getId()))
            throw new OperationNotPermitedException("You can not borrow your own book.");

        final boolean isAlreadyBorrowed = transactionRepository.isBookBorrowedByUser(book.getId(), user.getId());
        if(isAlreadyBorrowed)
            throw new OperationNotPermitedException("The book is already borrowed.");

        var history = BookTransactionHistory
            .builder()
            .user(user)
            .book(book)
            .returned(false)
            .returnApproved(false)
            .build();

        return transactionRepository.save(history).getId();
    }

    public Integer returnBook(Integer bookId, Authentication auth) {
        Book book = bookRepository.findById(bookId)
            .orElseThrow(()->new EntityNotFoundException("No book found of id: "+bookId));

        if(book.getArchived() || !book.getShareable())
            throw new OperationNotPermitedException("You cannot return the book that is not shareable or archived.");

        User user = (User) auth.getPrincipal();
        if(Objects.equals(user.getId(),book.getOwner().getId()))
            throw new OperationNotPermitedException("You can not return your own book.");

        var bookTransaction = transactionRepository.findBookByIdAndUserId(book.getId(), user.getId())
                                .orElseThrow(()->new OperationNotPermitedException("You did not borrow this book."));
        bookTransaction.setReturned(true);
        return transactionRepository.save(bookTransaction).getId();
    }


    public Integer approveReturn(Integer bookId, Authentication auth) {
        Book book = bookRepository.findById(bookId)
            .orElseThrow(()->new EntityNotFoundException("No book found of id: "+bookId));

        if(book.getArchived() || !book.getShareable())
            throw new OperationNotPermitedException("You cannot approve the book that is not shareable or archived.");

        User user = (User) auth.getPrincipal();
        if(!Objects.equals(user.getId(),book.getOwner().getId()))
            throw new OperationNotPermitedException("You can not approve book you do not own.");

        var bookTransaction = transactionRepository.findBookByIdAndOwnerId(book.getId(), user.getId())
            .orElseThrow(()->new OperationNotPermitedException("The book is not returned."));

        bookTransaction.setReturnApproved(true);
        return transactionRepository.save(bookTransaction).getId();
    }


    public void uploadBookCover(MultipartFile file, Integer bookId, Authentication auth) {
        Book book = bookRepository.findById(bookId)
            .orElseThrow(()->new EntityNotFoundException("No book found of id: "+bookId));

        User user = (User) auth.getPrincipal();
        if(!Objects.equals(user.getId(),book.getOwner().getId()))
            throw new OperationNotPermitedException("You can not update others book.");

        String bookCover = fileStorageService.saveFile(file, user.getId());
        book.setBookCover(bookCover);
        bookRepository.save(book);
    }
}
