package com.ms.bsn.book;

import com.ms.bsn.common.PageResponse;
import com.ms.bsn.handler.BusinessErrorCodes;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.hibernate.query.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
@Tag(name = "Book")
public class BookController {
    private final BookService service;

    @PostMapping
    public ResponseEntity<Integer> saveBook(@RequestBody @Valid BookRequest request, Authentication auth){
        return ResponseEntity.ok(service.save(request, auth));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookResponse> findBookById(@PathVariable("id") Integer id){
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping()
    public ResponseEntity<PageResponse<BookResponse>> findAllBooks(
        @RequestParam(name = "page", defaultValue = "0", required = false) int page,
        @RequestParam(name = "size", defaultValue = "10", required = false) int size,
        Authentication auth
    ){
        return  ResponseEntity.ok(service.findAllBooks(page, size, auth));
    }

    @GetMapping("/owner")
    public ResponseEntity<PageResponse<BookResponse>> findAllBooksByOwner(
        @RequestParam(name = "page", defaultValue = "0", required = false) int page,
        @RequestParam(name = "size", defaultValue = "10", required = false) int size,
        Authentication auth
    ){
        return  ResponseEntity.ok(service.findAllBooksByOwner(page, size, auth));
    }

    @GetMapping("/borrowed")
    public ResponseEntity<PageResponse<BorrowedBookResponse>> findAllBorrowedBooks(
        @RequestParam(name = "page", defaultValue = "0", required = false) int page,
        @RequestParam(name = "size", defaultValue = "10", required = false) int size,
        Authentication auth
    ){
        return  ResponseEntity.ok(service.findAllBorrowedBooks(page, size, auth));
    }

    @GetMapping("/returned")
    public ResponseEntity<PageResponse<BorrowedBookResponse>> findAllReturnedBooks(
        @RequestParam(name = "page", defaultValue = "0", required = false) int page,
        @RequestParam(name = "size", defaultValue = "10", required = false) int size,
        Authentication auth
    ){
        return  ResponseEntity.ok(service.findAllReturnedBooks(page, size, auth));
    }

    @PatchMapping("/shareable/{bookId}")
    public ResponseEntity<Integer> updateShareableStatus(
        @PathVariable(name = "bookId") Integer bookId,
        Authentication auth
    ){
        return  ResponseEntity.ok(service.updateShareableStatus(bookId, auth));
    }

    @PatchMapping("/archived/{bookId}")
    public ResponseEntity<Integer> updateArchivedStatus(
        @PathVariable(name = "bookId") Integer bookId,
        Authentication auth
    ){
        return  ResponseEntity.ok(service.updateArchivedStatus(bookId, auth));
    }

    @PostMapping("/borrow/{bookId}")
    public ResponseEntity<Integer> borrowBook(
        @PathVariable(name = "bookId") Integer bookId,
        Authentication auth
    ){
        return  ResponseEntity.ok(service.borrowBook(bookId, auth));
    }

    @PatchMapping("/return/{bookId}")
    public ResponseEntity<Integer> returnBook(
        @PathVariable(name = "bookId") Integer bookId,
        Authentication auth
    ){
        return  ResponseEntity.ok(service.returnBook(bookId, auth));
    }

    @PatchMapping("/return/approve/{bookId}")
    public ResponseEntity<Integer> approveReturn(
        @PathVariable(name = "bookId") Integer bookId,
        Authentication auth
    ){
        return  ResponseEntity.ok(service.approveReturn(bookId, auth));
    }

    @PostMapping(value = "/cover/{bookId}", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadBookCover(
        @PathVariable(name="bookId") Integer bookId,
        @Parameter
        @RequestPart("file") MultipartFile file,
        Authentication auth
    ){
        service.uploadBookCover(file, bookId, auth);
        return ResponseEntity.accepted().build();
    }
}
