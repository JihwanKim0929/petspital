package com.example.petcare.entity;

import com.example.petcare.dto.DiaryPageDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.File;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class DiaryPage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Diary diary;

    private String content;

    private LocalDateTime createDate;

    private String image_url;

    @JsonIgnore
    @PreRemove
    public void deleteImage(){
        File imageFile = new File("C:\\spring_image_test\\diary\\"+image_url);
        if(imageFile.exists()){
            imageFile.delete();
        }
    }

    @JsonIgnore
    public DiaryPageDto getDiaryPageDto(){
        return DiaryPageDto.builder()
                .id(id)
                .diary(diary)
                .content(content)
                .createDate(createDate)
                .image_url(image_url)
                .build();
    }
}
