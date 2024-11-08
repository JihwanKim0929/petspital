package com.example.petcare.entity;

import com.example.petcare.dto.DiseaseDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Disease {
    @Id
    private Long id;

    private String name;

    private String symptoms;

    private String description;

    @JsonIgnore
    public DiseaseDto getDiseaseDto(){
        return DiseaseDto.builder()
                .id(id)
                .name(name)
                .symptoms(symptoms)
                .description(description)
                .build();
    }
}
