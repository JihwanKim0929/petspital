package com.example.petcare.dto;

import com.example.petcare.entity.AnimalHospital;
import com.example.petcare.entity.Pet;
import com.example.petcare.entity.Reservation;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDto {
    private Long id;

    Pet pet;

    private LocalDateTime reservationDate;

    private LocalDateTime createDate;

    private AnimalHospital animalHospital;


    @JsonIgnore
    public Reservation getReservation() {
        return Reservation.builder()
                .id(id)
                .pet(pet)
                .reservationDate(reservationDate)
                .createDate(createDate)
                .animalHospital(animalHospital)
                .build();
    }
}
