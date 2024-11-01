package com.example.petcare.entity;


import com.example.petcare.dto.PetDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="siteUser_id")
    private SiteUser siteUser;

    private String name;

    private int age;

    private String gender;

    private String species;

    private int weight;

    private String description;

    private String image_url;


    @JsonIgnore
    public PetDto get_PetDto(){
        return PetDto.builder()
                .id(id)
                .siteUser(siteUser)
                .name(name)
                .age(age)
                .gender(gender)
                .species(species)
                .weight(weight)
                .description(description)
                .image_url(image_url)
                .build();
    }
}

