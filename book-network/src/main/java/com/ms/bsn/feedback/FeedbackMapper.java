package com.ms.bsn.feedback;

import com.ms.bsn.book.Book;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class FeedbackMapper {

    public Feedback toFeedback(@Valid FeedbackRequest request) {
        return Feedback
            .builder()
            .rating(request.rating())
            .comments(request.comments())
            .book(Book.builder().id(request.bookId()).build())
            .build();
    }

    public FeedbackResponse toFeedbackResponse(Feedback f, Integer userId) {
        return FeedbackResponse
            .builder()
            .rating(f.getRating())
            .comment(f.getComments())
            .ownFeedback(Objects.equals(f.getCreatedBy(), userId))
            .build();
    }
}
