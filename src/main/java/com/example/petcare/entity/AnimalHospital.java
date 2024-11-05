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

    String hospitalAddress;

    @ManyToMany
    @JoinTable(
            name="animal_hospital_pet",
            joinColumns = @JoinColumn(name = "ANIMAL_HOSPITAL_ID"),
            inverseJoinColumns = @JoinColumn(name="PET_ID")
    )
    @JsonIgnore
    private List<Pet> petList = new ArrayList<>();

    public AnimalHospitalDto getAnimalHospitalDto() {
        return AnimalHospitalDto.builder()
                .id(id)
                .siteUser(siteUser)
                .hospitalName(hospitalName)
                .hospitalAddress(hospitalAddress)
                .build();
    }
}
