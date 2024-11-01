package com.example.petcare.service;

import com.example.petcare.dto.CommentDto;
import com.example.petcare.entity.Board;
import com.example.petcare.entity.Comment;
import com.example.petcare.entity.SiteUser;
import com.example.petcare.repository.BoardRepository;
import com.example.petcare.repository.CommentRepository;
import com.example.petcare.repository.SiteUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private SiteUserRepository userRepository;

    public List<CommentDto> comments(Long boardId) {
        return commentRepository.findByBoardId(boardId)
                .stream()
                .map(comment->comment.getCommentDto())
                .collect(Collectors.toList());
    }

    public CommentDto create(Long boardId, CommentDto dto, Long userId) {
        SiteUser siteUser = userRepository.findById(userId).orElse(null);
        Board board = boardRepository.findById(boardId).orElse(null);
        dto.setAuthor(siteUser);
        dto.setBoard(board);
        dto.setCreateDate(LocalDateTime.now());
        Comment created = commentRepository.save(dto.getComment());
        return created.getCommentDto();

    }
}
