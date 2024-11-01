package com.example.petcare.controller;

import com.example.petcare.dto.DiagnosisDto;
import com.example.petcare.service.DiagnosisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
public class DiagnosisController {

    @Autowired
    DiagnosisService diagnosisService;

    @PostMapping("/pet/{petId}/diagnosis")
    public ResponseEntity<DiagnosisDto> createDiagnosis(@PathVariable Long petId, @RequestPart("image") MultipartFile image, @RequestPart("diagnosisDto") DiagnosisDto diagnosisDto) throws IOException {
        DiagnosisDto createdDto = diagnosisService.createDiagnosis(petId, image, diagnosisDto);
        return createdDto!=null?
                ResponseEntity.status(HttpStatus.OK).body(createdDto):
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @GetMapping("/pet/{petId}/diagnosis")
    public ResponseEntity<List<DiagnosisDto>> getDiagnosisList(@PathVariable Long petId) {
        List<DiagnosisDto> dtos = diagnosisService.get_diagnosis_list(petId);
        return ResponseEntity.status(HttpStatus.OK).body(dtos);
    }
    @GetMapping("/diagnosis/{id}")
    public ResponseEntity<DiagnosisDto> getDiagnosis(@PathVariable Long id) {
        DiagnosisDto dto = diagnosisService.get_diagnosis(id);
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }
}
