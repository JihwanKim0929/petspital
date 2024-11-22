package com.example.petcare.service;

import com.example.petcare.dto.AnimalHospitalDto;
import com.example.petcare.dto.CommentDto;
import com.example.petcare.dto.ReservationDto;
import com.example.petcare.entity.*;
import com.example.petcare.repository.AnimalHospitalRepository;
import com.example.petcare.repository.PetRepository;
import com.example.petcare.repository.ReservationRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    @Autowired
    ReservationRepository reservationRepository;
    @Autowired
    private PetRepository petRepository;
    @Autowired
    private AnimalHospitalRepository animalHospitalRepository;
    @Autowired
    private AnimalHospitalService animalHospitalService;

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

    public ReservationDto createReservation(Long petId, Long hospitalId, ReservationDto reservationDto) {
        Pet pet = petRepository.findById(petId).orElse(null);
        reservationDto.setPet(pet);
        reservationDto.setCreateDate(LocalDateTime.now());
        AnimalHospital animalHospital = animalHospitalRepository.findById(hospitalId).orElse(null);
        reservationDto.setAnimalHospital(animalHospital);
        Reservation created = reservationRepository.save(reservationDto.getReservation());
        return created.getReservationDto();
    }

    public ReservationDto deleteReservation(Long reservationId) {
        Reservation target = reservationRepository.findById(reservationId).orElse(null);
        if(target != null){
            ReservationDto dto =target.getReservationDto();
            reservationRepository.delete(target);
            return dto;
        }
        else
            return null;
    }

    public ReservationDto updateReservation(Long reservationId, ReservationDto reservationDto) {
        Reservation target = reservationRepository.findById(reservationId).orElse(null);
        if(target != null){
            BeanUtils.copyProperties(reservationDto, target, "id","pet","createDate");
            reservationRepository.save(target);
        }
        return target.getReservationDto();
    }

    public List<ReservationDto> getVetReservation(Long vetId) {
        AnimalHospitalDto dto = animalHospitalService.getAnimalHospitalByUserId(vetId);
        return reservationRepository.findByAnimalHospital(dto.getAnimalHospital())
                        .stream()
                        .map(reservation -> reservation.getReservationDto())
                        .collect(Collectors.toList());
    }
}
