package com.example.petcare.entity;

import com.example.petcare.dto.ReservationDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    Pet pet;

    private LocalDateTime reservationDate;

    private LocalDateTime createDate;

    @ManyToOne
    private AnimalHospital animalHospital;

    @JsonIgnore
    public ReservationDto getReservationDto() {
        return ReservationDto.builder()
                .id(id)
                .pet(pet)
                .reservationDate(reservationDate)
                .createDate(createDate)
                .animalHospital(animalHospital)
                .build();
    }
}
