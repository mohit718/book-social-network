package com.ms.bsn.book;

import com.ms.bsn.common.BaseEntity;
import com.ms.bsn.feedback.Feedback;
import com.ms.bsn.history.BookTransactionHistory;
import com.ms.bsn.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Book extends BaseEntity {

    private String title;
    private String authorName;
    private String isbn;
    private String synopsis;
    private String bookCover;
    private Boolean archived = false;
    private Boolean shareable = true;

    @ManyToOne
    private User owner;

    @OneToMany(mappedBy = "book")
    private List<Feedback> feedbacks;

    @OneToMany(mappedBy = "book")
    private List<BookTransactionHistory> histories;

    @Transient
    public double getAverageRating(){
        if(feedbacks==null || feedbacks.isEmpty())
            return 0.0;
        var rating = this.feedbacks.stream().mapToDouble(Feedback::getRating).average().orElse(0.0);
        var roundedRating = Math.round(rating*10.0)/10.0;
        return roundedRating;
    }
}

