package com.example.petcare.controller;

import com.example.petcare.dto.CommentDto;
import com.example.petcare.service.CommentService;
import com.example.petcare.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CommentController {

    @Autowired
    CommentService commentService;

    @Autowired
    UserService userService;

    @GetMapping("/board/{boardId}/comment")
    public ResponseEntity<List<CommentDto>> comments(@PathVariable Long boardId) {
        List<CommentDto> dtos = commentService.comments(boardId);
        return ResponseEntity.ok().body(dtos);
    }

    @PostMapping("/board/{boardId}/comment")
    public ResponseEntity<CommentDto> createComment(@PathVariable Long boardId, @RequestBody CommentDto dto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Long userId = userService.get_user_by_username(username).getId();
        CommentDto createdDto = commentService.create(boardId,dto,userId);
        return ResponseEntity.ok().body(createdDto);
    }

}
