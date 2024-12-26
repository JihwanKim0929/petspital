package com.example.petcare.entity;

import com.example.petcare.dto.AnimalHospitalDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class AnimalHospital {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @OneToOne
    SiteUser siteUser;

    String hospitalName;

    @Column(unique=true)
    String hospitalAddress;

    @JsonIgnore
    public AnimalHospitalDto getAnimalHospitalDto() {
        return AnimalHospitalDto.builder()
                .id(id)
                .siteUser(siteUser)
                .hospitalName(hospitalName)
                .hospitalAddress(hospitalAddress)
                .build();
    }
}
