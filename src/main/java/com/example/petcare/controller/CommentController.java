package com.example.petcare.controller;

import com.example.petcare.dto.AnimalHospitalDto;
import com.example.petcare.dto.CommentDto;
import com.example.petcare.dto.DiagnosisDto;
import com.example.petcare.service.CommentService;
import com.example.petcare.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @DeleteMapping("/comment/{id}")//pet 삭제
    public ResponseEntity<CommentDto> deleteComment(@PathVariable Long id) {
        CommentDto deletedDto = commentService.deleteComment(id);
        if(deletedDto != null)
            return ResponseEntity.status(HttpStatus.OK).body(deletedDto);
        else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @PostMapping("/updateComment/{id}")//등록된 AnimalHospital 정보 수정
    public ResponseEntity<CommentDto> updateComment(@RequestBody CommentDto commentDto, @PathVariable Long id) {

        CommentDto dto =  commentService.updateComment(commentDto,id);

        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }
}