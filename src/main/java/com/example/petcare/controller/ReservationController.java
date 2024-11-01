package com.example.petcare.controller;

import com.example.petcare.dto.ReservationDto;
import com.example.petcare.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReservationController {

    @Autowired
    ReservationService reservationService;

    @GetMapping("/reservation/{id}")
    public ResponseEntity<ReservationDto> getReservation(@PathVariable Long id) {
        ReservationDto reservationDto = reservationService.getReservation(id);
        return ResponseEntity.ok().body(reservationDto);
    }

    @GetMapping("/pet/{petId}/reservation")
    public ResponseEntity<List<ReservationDto>> getReservations(@PathVariable Long petId) {
        List<ReservationDto> dtos = reservationService.getReservations(petId);
        return ResponseEntity.ok().body(dtos);
    }


    @PostMapping("/pet/{petId}/reservation")
    public ResponseEntity<ReservationDto> createReservation(@PathVariable Long petId, @RequestBody ReservationDto reservationDto) {
           ReservationDto createdDto = reservationService.createReservation(petId,reservationDto);
           return ResponseEntity.ok().body(createdDto);
    }
}
