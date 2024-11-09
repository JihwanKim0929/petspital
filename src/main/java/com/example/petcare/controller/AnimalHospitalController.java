package com.example.petcare.controller;

import com.example.petcare.dto.AnimalHospitalDto;
import com.example.petcare.dto.PetDto;
import com.example.petcare.service.AnimalHospitalService;
import com.example.petcare.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

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

    @GetMapping("/animalHospitalList")
    public ResponseEntity<List<AnimalHospitalDto>> getAnimalHospitalList() {
        List<AnimalHospitalDto> dtos = animalHospitalService.getAnimalHospitalList();
        return ResponseEntity.ok().body(dtos);
    }

    @PostMapping("/vet/updateAnimalHospital")//등록된 AnimalHospital 정보 수정
    public ResponseEntity<AnimalHospitalDto> updatePet(@RequestBody AnimalHospitalDto animalHospitalDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Long userId = userService.get_user_by_username(username).getId();   //현재id
        animalHospitalService.updateAnimalHospital(animalHospitalDto, userId);

        return ResponseEntity.status(HttpStatus.OK).body(animalHospitalDto);
    }

}
