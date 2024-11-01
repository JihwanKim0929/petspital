package com.example.petcare.entity;

import com.example.petcare.dto.CommentDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    @ManyToOne
    private Board board;

    @ManyToOne
    private SiteUser author;

    private LocalDateTime createDate;

    private LocalDateTime modifyDate;

    @JsonIgnore
    public CommentDto getCommentDto() {
        return CommentDto.builder()
                .id(id)
                .content(content)
                .board(board)
                .author(author)
                .createDate(createDate)
                .modifyDate(modifyDate)
                .build();
    }
}
