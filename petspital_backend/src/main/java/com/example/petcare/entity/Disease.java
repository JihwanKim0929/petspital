package com.example.petcare.entity;

import com.example.petcare.dto.DiseaseDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
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

    @Column(columnDefinition = "TEXT")
    private String description;

    private String image_url;

    @JsonIgnore
    public DiseaseDto getDiseaseDto(){
        return DiseaseDto.builder()
                .id(id)
                .name(name)
                .symptoms(symptoms)
                .description(description)
                .image_url(image_url)
                .build();
    }
}
