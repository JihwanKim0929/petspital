package com.example.petcare.repository;

import com.example.petcare.entity.Comment;
import com.example.petcare.entity.DiaryPage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query(value="SELECT * FROM comment WHERE board_id = :boardId",nativeQuery = true)
    List<Comment> findByBoardId(Long boardId);

    @Query(value="SELECT * FROM comment WHERE author_id = :authorId",nativeQuery = true)
    List<Comment> findByAuthorId(Long authorId);
}
