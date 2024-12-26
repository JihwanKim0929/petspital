package com.example.petcare.entity;


import com.example.petcare.dto.DiagnosisDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.File;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Diagnosis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="pet_id")
    private Pet pet;

    private String species;

    private String part;

    private LocalDateTime createDate;

    private String image_url;

    @ManyToOne
    private Disease disease;


    @JsonIgnore
    public DiagnosisDto get_DiagnosisDto() {
        return DiagnosisDto.builder()
                .id(id)
                .pet(pet)
                .species(species)
                .part(part)
                .createDate(createDate)
                .image_url(image_url)
                .disease(disease)
                .build();
    }
}

