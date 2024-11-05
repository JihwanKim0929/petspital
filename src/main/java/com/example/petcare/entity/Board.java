package com.example.petcare.entity;

import com.example.petcare.dto.BoardDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.File;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Board {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String content;

    private LocalDateTime createDate;

    @ManyToOne
    private SiteUser author;

    private LocalDateTime modifyDate;

    private String image_url;

    @JsonIgnore
    @PreRemove
    public void deleteImage(){
        File imageFile = new File("C:\\spring_image_test\\board\\"+image_url);
        if(imageFile.exists()){
            imageFile.delete();
        }
    }

    @JsonIgnore
    public BoardDto getBoardDto() {
        return BoardDto.builder()
                .id(id)
                .title(title)
                .content(content)
                .createDate(createDate)
                .modifyDate(modifyDate)
                .author(author)
                .image_url(image_url)
                .build();
    }

}
