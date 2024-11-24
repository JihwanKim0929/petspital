package com.example.petcare.service;

import com.example.petcare.S3Service;
import com.example.petcare.dto.BoardDto;
import com.example.petcare.dto.CommentDto;
import com.example.petcare.entity.Board;
import com.example.petcare.entity.Comment;
import com.example.petcare.entity.SiteUser;
import com.example.petcare.repository.BoardRepository;
import com.example.petcare.repository.CommentRepository;
import com.example.petcare.repository.SiteUserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BoardService {

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    SiteUserRepository userRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private CommentService commentService;

    @Autowired
    private S3Service s3Service;

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

    public BoardDto createBoard(BoardDto boardDto, Long userId, MultipartFile image)throws IOException {
        if(image != null){
            String fileName = s3Service.uploadFile(image);
            boardDto.setImage_url(fileName);
        }
        SiteUser siteUser = userRepository.findById(userId).orElse(null);
        boardDto.setAuthor(siteUser);
        boardDto.setCreateDate(LocalDateTime.now());
        Board created = boardRepository.save(boardDto.getBoard());
        return created.getBoardDto();
    }

    public BoardDto deleteBoard(Long boardId) {
        Board target = boardRepository.findById(boardId).orElse(null);
        if(target != null){
//            s3Service.deleteFile(target.getImage_url());
            List<Comment> comments = commentRepository.findByBoardId(boardId);
            for(Comment comment : comments){
                commentService.deleteComment(comment.getId());
            }
            BoardDto dto =target.getBoardDto();
            boardRepository.delete(target);
            return dto;
        }
        else
            return null;
    }

    public BoardDto updateBoard(BoardDto newBoardDto, Long boardId) {
        Board board = boardRepository.findById(boardId).orElse(null);
        newBoardDto.setModifyDate(LocalDateTime.now());

        if(board != null){
            BeanUtils.copyProperties(newBoardDto, board, "id","image_url","author","createDate");
            boardRepository.save(board);
        }
        return board.getBoardDto();
    }
}
