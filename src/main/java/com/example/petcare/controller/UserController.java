package com.example.petcare.controller;

import com.example.petcare.dto.SiteUserDto;
import com.example.petcare.entity.SiteUser;
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

    @PostMapping("/user")
    public ResponseEntity<SiteUserDto> createUser(@RequestPart("image") MultipartFile image, @RequestPart("userDto") SiteUserDto userDto) throws IOException {
        SiteUserDto createdDto = userService.createUser(image,userDto);
        return ResponseEntity.status(HttpStatus.OK).body(createdDto);
    }

    

    @GetMapping("/user")
    public ResponseEntity<SiteUserDto> getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        SiteUserDto userDto = userService.get_user_by_username(username);
        return ResponseEntity.status(HttpStatus.OK).body(userDto);
    }

}

