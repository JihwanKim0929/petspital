package com.example.petcare.service;

import com.example.petcare.dto.BoardDto;
import com.example.petcare.entity.Board;
import com.example.petcare.entity.SiteUser;
import com.example.petcare.repository.BoardRepository;
import com.example.petcare.repository.SiteUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BoardService {

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    SiteUserRepository userRepository;

    public List<BoardDto> boards() {
        return boardRepository.findAll()
                .stream()
                .map(board->board.getBoardDto())
                .collect(Collectors.toList());
    }

    public BoardDto get_board(Long id) {
        Board board = boardRepository.findById(id).orElse(null);
        return board!=null?board.getBoardDto():null;
    }

    public BoardDto createBoard(BoardDto boardDto, Long userId) {
        SiteUser siteUser = userRepository.findById(userId).orElse(null);
        boardDto.setAuthor(siteUser);
        boardDto.setCreateDate(LocalDateTime.now());
        Board created = boardRepository.save(boardDto.getBoard());
        return created.getBoardDto();
    }
}
