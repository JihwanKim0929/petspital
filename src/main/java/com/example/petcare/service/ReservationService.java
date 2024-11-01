package com.example.petcare.service;

import com.example.petcare.dto.ReservationDto;
import com.example.petcare.entity.Pet;
import com.example.petcare.entity.Reservation;
import com.example.petcare.repository.PetRepository;
import com.example.petcare.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    @Autowired
    ReservationRepository reservationRepository;
    @Autowired
    private PetRepository petRepository;

    public ReservationDto getReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id).orElse(null);
        return (reservation!=null) ? reservation.getReservationDto():null;
    }

    public List<ReservationDto> getReservations(Long petId) {
        return reservationRepository.findByPetId(petId)
                .stream()
                .map(reservation->reservation.getReservationDto())
                .collect(Collectors.toList());
    }

    public ReservationDto createReservation(Long petId, ReservationDto reservationDto) {
        Pet pet = petRepository.findById(petId).orElse(null);
        reservationDto.setPet(pet);
        reservationDto.setCreateDate(LocalDateTime.now());
        Reservation created = reservationRepository.save(reservationDto.getReservation());
        return created.getReservationDto();
    }
}
