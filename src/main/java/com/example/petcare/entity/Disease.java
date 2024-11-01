package com.example.petcare.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Disease {
    @Id
    private Long id;

    private String name;

    private String symptoms;

    private String description;
}
