package com.ms.bsn.feedback;

import com.ms.bsn.book.Book;
import com.ms.bsn.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Feedback extends BaseEntity {
    private Double rating;
    private String comments;

    @ManyToOne
    private Book book;
}
