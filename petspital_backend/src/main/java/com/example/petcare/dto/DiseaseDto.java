package com.example.petcare.dto;

import com.example.petcare.entity.Disease;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DiseaseDto {
    private Long id;

    private String name;

    private String symptoms;

    private String description;

    private String image_url;

    @JsonIgnore
    public Disease getDisease(){
        return Disease.builder()
                .id(id)
                .name(name)
                .symptoms(symptoms)
                .description(description)
                .image_url(image_url)
                .build();
    }
}
