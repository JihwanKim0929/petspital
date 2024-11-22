package com.example.petcare.controller;

import com.example.petcare.dto.PetDto;
import com.example.petcare.dto.ReservationDto;
import com.example.petcare.dto.SiteUserDto;
import com.example.petcare.service.ReservationService;
import com.example.petcare.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
public class ReservationController {

    @Autowired
    ReservationService reservationService;
    @Autowired
    private UserService userService;

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

    @PostMapping("/pet/{petId}/{hospitalId}/reservation")
    public ResponseEntity<ReservationDto> createReservation(@PathVariable Long petId, @PathVariable Long hospitalId, @RequestBody ReservationDto reservationDto) {
           ReservationDto createdDto = reservationService.createReservation(petId,hospitalId,reservationDto);
           return ResponseEntity.ok().body(createdDto);
    }

    @DeleteMapping("/reservation/{id}")
    public ResponseEntity<ReservationDto> deleteReservation(@PathVariable Long id) {
        ReservationDto deletedDto = reservationService.deleteReservation(id);
        if(deletedDto != null)
            return ResponseEntity.status(HttpStatus.OK).body(deletedDto);
        else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @PostMapping("/updateReservation/{id}")
    public ResponseEntity<ReservationDto> updateReservation(@RequestBody ReservationDto reservationDto, @PathVariable Long id){
        ReservationDto updatedDto = reservationService.updateReservation(id, reservationDto);

        return ResponseEntity.status(HttpStatus.OK).body(updatedDto);
    }

    @PreAuthorize("hasRole('ROLE_VET')")
    @GetMapping("/reservation/vet")
    public ResponseEntity<List<ReservationDto>> getVetReservations(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        SiteUserDto userDto = userService.get_user_by_username(username);
        List<ReservationDto> dtos = reservationService.getVetReservation(userDto.getId());
        return ResponseEntity.ok().body(dtos);
    }
}
