package com.example.petcare.controller;

import com.example.petcare.dto.PetDto;
import com.example.petcare.service.PetService;
import com.example.petcare.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping
public class PetController {
    @Autowired
    PetService petService;
    @Autowired
    UserService userService;

    @PostMapping("/user/pet")
    public ResponseEntity<PetDto> createPet(@RequestPart("image") MultipartFile image, @RequestPart("petDto") PetDto petDto) throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Long userId = userService.get_user_by_username(username).getId();
        PetDto createdDto = petService.createPet(petDto, userId, image);
        return ResponseEntity.status(HttpStatus.OK).body(createdDto);
    }

    @PostMapping("/user/deletePet")//등록된 pet 삭제
    public ResponseEntity<PetDto> deletePet(@RequestBody PetDto petDto) throws IOException{
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Long userId = userService.get_user_by_username(username).getId();
        petService.deletePet(petDto, userId);

        return ResponseEntity.status(HttpStatus.OK).body(petDto);

    }

    @PostMapping("/user/updatePet")//등록된 pet 정보 수정
    public ResponseEntity<PetDto> updatePet(@RequestPart("image") MultipartFile image, @RequestPart("petDto") PetDto petDto) throws IOException{
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Long userId = userService.get_user_by_username(username).getId();
        petService.updatePet(petDto, userId, image);

        return ResponseEntity.status(HttpStatus.OK).body(petDto);
    }

    @GetMapping("/user/pet")
    public ResponseEntity<List<PetDto>> getPets() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Long userId = userService.get_user_by_username(username).getId();
        List<PetDto> dtos = petService.get_pet_list(userId);
        return ResponseEntity.status(HttpStatus.OK).body(dtos);
    }

    @GetMapping("/pet/{id}")
    public ResponseEntity<PetDto> getPet(@PathVariable Long id) {
        PetDto dto = petService.get_pet(id);
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }
}