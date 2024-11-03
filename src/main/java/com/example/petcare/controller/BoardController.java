package com.example.petcare.controller;

import com.example.petcare.dto.BoardDto;
import com.example.petcare.service.BoardService;
import com.example.petcare.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
public class BoardController {

    @Autowired
    BoardService boardService;

    @Autowired
    UserService userService;

    @GetMapping("/board")
    public ResponseEntity<List<BoardDto>> boards(){
        List<BoardDto> dtos = boardService.boards();
        return ResponseEntity.ok().body(dtos);
    }

    @GetMapping("/board/{id}")
    public ResponseEntity<BoardDto> show(@PathVariable Long id){
        BoardDto dto = boardService.get_board(id);
        return ResponseEntity.ok().body(dto);
    }

    @PostMapping("/board")
    public ResponseEntity<BoardDto> create(@RequestPart("image") MultipartFile image,  @RequestPart("boardDto") BoardDto boardDto) throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Long userId = userService.get_user_by_username(username).getId();
        BoardDto createdDto = boardService.createBoard(boardDto,userId, image);
        return ResponseEntity.ok().body(createdDto);
    }
}
