package com.example.petcare.entity;

import com.example.petcare.dto.DiaryDto;
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
public class Diary {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String title;

    @ManyToOne
    private Pet pet;

    private LocalDateTime createDate;

    @JsonIgnore
    public DiaryDto getDiaryDto() {
        return DiaryDto.builder()
                .id(id)
                .title(title)
                .pet(pet)
                .createDate(createDate)
                .build();
    }

}
