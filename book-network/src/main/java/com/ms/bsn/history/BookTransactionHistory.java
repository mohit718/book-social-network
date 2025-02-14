package com.ms.bsn.history;

import com.ms.bsn.book.Book;
import com.ms.bsn.common.BaseEntity;
import com.ms.bsn.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class BookTransactionHistory extends BaseEntity {

    @ManyToOne
    private User user;
    @ManyToOne
    private Book book;

    private Boolean returned;
    private Boolean returnApproved;

}
