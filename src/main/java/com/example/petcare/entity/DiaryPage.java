package com.example.petcare.entity;

import com.example.petcare.dto.DiaryPageDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

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

    @JsonIgnore
    public DiaryPageDto getDiaryPageDto(){
        return DiaryPageDto.builder()
                .id(id)
                .diary(diary)
                .content(content)
                .createDate(createDate)
                .build();
    }
}
