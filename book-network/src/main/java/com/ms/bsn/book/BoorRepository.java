package com.ms.bsn.book;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoorRepository extends JpaRepository<Book, Integer> {

}
