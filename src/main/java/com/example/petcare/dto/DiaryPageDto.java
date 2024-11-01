package com.example.petcare.dto;

import com.example.petcare.entity.Diary;
import com.example.petcare.entity.DiaryPage;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.ManyToOne;
import lombok.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiaryPageDto {
    private Long id;

    @JsonIgnore
    private Diary diary;

    private String content;

    private LocalDateTime createDate;

    @JsonIgnore
    public DiaryPage getDiaryPage() {
        return DiaryPage.builder()
                .id(id)
                .diary(diary)
                .content(content)
                .createDate(createDate)
                .build();
    }
}
