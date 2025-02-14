package com.ms.bsn.feedback;

import com.ms.bsn.book.Book;
import com.ms.bsn.book.BookRepository;
import com.ms.bsn.common.PageResponse;
import com.ms.bsn.exception.OperationNotPermitedException;
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

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final BookRepository bookRepository;
    private final FeedbackRepository feedbackRepository;
    private final FeedbackMapper feedbackMapper;

    public Integer save(@Valid FeedbackRequest request, Authentication auth) {
        Book book = bookRepository.findById(request.bookId())
            .orElseThrow(() -> new EntityNotFoundException("No book found of id: " + request.bookId()));

        if (book.getArchived() || !book.getShareable())
            throw new OperationNotPermitedException("You cannot give feedback to the book that is not shareable or archived.");

        User user = (User) auth.getPrincipal();
        if (Objects.equals(user.getId(), book.getOwner().getId()))
            throw new OperationNotPermitedException("You can not give feedback to your own book.");

        Feedback feedback = feedbackMapper.toFeedback(request);

        return feedbackRepository.save(feedback).getId();

    }

    public PageResponse<FeedbackResponse> findAllFeedbacksByBook(Integer bookId, int page, int size, Authentication auth) {
        Pageable pageable = PageRequest.of(page, size);
        User user = (User) auth.getPrincipal();
        Page<Feedback> feedbacks = feedbackRepository.findAllByBookId(bookId, pageable);
        List<FeedbackResponse> feedbackResponses = feedbacks.stream().map(f -> feedbackMapper.toFeedbackResponse(f, user.getId())).toList();
        return new PageResponse<>(
            feedbackResponses,
            feedbacks.getNumber(),
            feedbacks.getSize(),
            feedbacks.getTotalElements(),
            feedbacks.getTotalPages(),
            feedbacks.isFirst(),
            feedbacks.isLast());
    }
}
