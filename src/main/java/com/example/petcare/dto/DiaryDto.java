package com.example.petcare.dto;

import com.example.petcare.entity.Diary;
import com.example.petcare.entity.Pet;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiaryDto {
    private Long id;

    private String title;

    private Pet pet;

    private LocalDateTime createDate;

    @JsonIgnore
    public Diary getDiary() {
        return Diary.builder()
                .id(id)
                .title(title)
                .pet(pet)
                .createDate(createDate)
                .build();
    }
}