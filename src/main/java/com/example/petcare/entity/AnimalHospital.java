package com.example.petcare.entity;

import com.example.petcare.dto.AnimalHospitalDto;
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

    public AnimalHospitalDto getAnimalHospitalDto() {
        return AnimalHospitalDto.builder()
                .id(id)
                .hospitalName(hospitalName)
                .hospitalAddress(hospitalAddress)
                .build();
    }


    @ManyToMany
    @JoinTable(
            name="animal_hospital_pet",
            joinColumns = @JoinColumn(name = "ANIMAL_HOSPITAL_ID"),
            inverseJoinColumns = @JoinColumn(name="PET_ID")
    )
    private List<Pet> petList = new ArrayList<>();

}
