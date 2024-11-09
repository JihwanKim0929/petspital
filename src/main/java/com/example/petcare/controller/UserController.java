package com.example.petcare.controller;

import com.example.petcare.dto.AnimalHospitalDto;
import com.example.petcare.dto.SiteUserDto;
import com.example.petcare.entity.AnimalHospital;
import com.example.petcare.entity.SiteUser;
import com.example.petcare.service.AnimalHospitalService;
import com.example.petcare.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class UserController {

    @Autowired
    UserService userService;
    @Autowired
    private AnimalHospitalService animalHospitalService;

    @PostMapping("/user")
    public ResponseEntity<SiteUserDto> createUser(@RequestPart("image") MultipartFile image, @RequestPart("userDto") SiteUserDto userDto) throws IOException {
        SiteUserDto createdDto = userService.createUser(image,userDto);
        return ResponseEntity.status(HttpStatus.OK).body(createdDto);
    }

    @PostMapping("/vet")
    public ResponseEntity<SiteUserDto> createVet(@RequestPart("image") MultipartFile image, @RequestPart("userDto") SiteUserDto userDto, @RequestPart("animalHospitalDto") AnimalHospitalDto animalHospitalDto) throws IOException {
        SiteUserDto createdUserDto = userService.createUser(image,userDto);
        AnimalHospitalDto creaetdAnimalHospitalDto = animalHospitalService.createAnimalHospital(animalHospitalDto,createdUserDto);
        return ResponseEntity.status(HttpStatus.OK).body(createdUserDto);
    }

    @GetMapping("/user")
    public ResponseEntity<SiteUserDto> getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        SiteUserDto userDto = userService.get_user_by_username(username);
        return ResponseEntity.status(HttpStatus.OK).body(userDto);
    }

    @DeleteMapping("/user")
    public ResponseEntity<SiteUserDto> deleteUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        SiteUserDto userDto = userService.get_user_by_username(username);
        Long id = userDto.getId();
        SiteUserDto deletedDto = userService.deleteUser(id);
        if(deletedDto != null)
            return ResponseEntity.status(HttpStatus.OK).body(deletedDto);
        else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

    }

    @PutMapping("/user")
    public ResponseEntity<SiteUserDto> updateUser(@RequestBody SiteUserDto newUserDto) throws  IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        SiteUserDto userDto = userService.get_user_by_username(username);
        if (userDto == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        Long id = userDto.getId();// id : 기존 id
        SiteUserDto updatedDto = userService.updateUser(id, newUserDto);

        if (updatedDto != null) {
            return ResponseEntity.status(HttpStatus.OK).body(updatedDto);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}

