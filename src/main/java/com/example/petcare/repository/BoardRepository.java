package com.example.petcare.repository;

import com.example.petcare.entity.Board;
import com.example.petcare.entity.Diary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {
    @Query(value="SELECT * FROM board WHERE author_id = :authorId",nativeQuery = true)
    List<Board> findByAuthorId(Long authorId);
}
