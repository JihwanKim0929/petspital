package com.example.petcare.controller;

import com.example.petcare.dto.AnimalHospitalDto;
import com.example.petcare.service.AnimalHospitalService;
import com.example.petcare.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AnimalHospitalController {

    @Autowired
    UserService userService;

    @Autowired
    AnimalHospitalService animalHospitalService;

    @PreAuthorize("hasRole('ROLE_VET')")
    @GetMapping("vet/animalHospital")
    public ResponseEntity<AnimalHospitalDto> getAnimalHospital() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Long userId = userService.get_user_by_username(username).getId();
        AnimalHospitalDto dto = animalHospitalService.getAnimalHospital(userId);
        return ResponseEntity.ok().body(dto);
    }

}
