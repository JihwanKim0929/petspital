package com.example.petcare.dto;

import com.example.petcare.entity.AnimalHospital;
import com.example.petcare.entity.SiteUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnimalHospitalDto {

    Long id;

    SiteUser siteUser;

    String hospitalName;

    String hospitalAddress;

    @JsonIgnore
    public AnimalHospital getAnimalHospital() {
        return AnimalHospital.builder()
                .id(id)
                .siteUser(siteUser)
                .hospitalName(hospitalName)
                .hospitalAddress(hospitalAddress)
                .build();
    }
}
