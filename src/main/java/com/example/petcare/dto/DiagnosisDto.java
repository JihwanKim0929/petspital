package com.example.petcare.dto;

import com.example.petcare.entity.Diagnosis;
import com.example.petcare.entity.Disease;
import com.example.petcare.entity.Pet;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiagnosisDto {

    private Long id;

    private Pet pet;

    private String species;

    private String part;

    private LocalDateTime createDate;

    private String image_url;

    private List<Disease> diseaseList;

    @JsonIgnore
    public Diagnosis get_Diagnosis() {
        return Diagnosis.builder()
                .id(id)
                .pet(pet)
                .species(species)
                .part(part)
                .createDate(createDate)
                .image_url(image_url)
                .diseaseList(diseaseList)
                .build();
    }
}
