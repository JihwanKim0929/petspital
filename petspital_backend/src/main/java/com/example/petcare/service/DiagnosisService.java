package com.example.petcare.service;

import com.example.petcare.S3Service;
import com.example.petcare.dto.DiagnosisDto;
import com.example.petcare.dto.DiaryPageDto;
import com.example.petcare.entity.Diagnosis;
import com.example.petcare.entity.DiaryPage;
import com.example.petcare.entity.Disease;
import com.example.petcare.entity.Pet;
import com.example.petcare.repository.DiagnosisRepository;
import com.example.petcare.repository.DiseaseRepository;
import com.example.petcare.repository.PetRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.HttpHeaders;


import java.io.File;
import java.io.IOException;
import java.net.URI;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DiagnosisService {

    @Autowired
    private DiagnosisRepository diagnosisRepository;
    @Autowired
    private DiseaseRepository diseaseRepository;
    @Autowired
    private PetRepository petRepository;
    @Autowired
    private S3Service s3Service;

    public DiagnosisDto createDiagnosis(Long petId, MultipartFile image, DiagnosisDto diagnosisDto) throws IOException {
        if(image.isEmpty())
            return null;

        Pet pet = petRepository.findById(petId).orElse(null);
        diagnosisDto.setPet(pet);

        //save image and set path to diagnosis dto
        String fileUrl = s3Service.uploadFile(image);
        diagnosisDto.setImage_url(fileUrl);


        URI uri = UriComponentsBuilder
                .fromUriString("http://localhost:8000")
                .path("/getDisease")
                .encode()
                .build()
                .toUri();

        RestTemplate restTemplate = new RestTemplate();

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("image_url", fileUrl);
        requestBody.put("species",diagnosisDto.getSpecies());
        requestBody.put("part", diagnosisDto.getPart());


        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Long> response = restTemplate.postForEntity(uri, requestEntity, Long.class);

        Long diseaseId = response.getBody();



        //set disease to diagnosisDto
        diagnosisDto.setDisease(diseaseRepository.findById(diseaseId).orElse(null));
        diagnosisDto.setCreateDate(LocalDateTime.now());

        Diagnosis created = diagnosisRepository.save(diagnosisDto.get_Diagnosis());
        return created.get_DiagnosisDto();

    }

    public List<DiagnosisDto> get_diagnosis_list(Long petId){
        return diagnosisRepository.findByPetId(petId)
                .stream()
                .map(diagnosis->diagnosis.get_DiagnosisDto())
                .collect(Collectors.toList());
    }

    public DiagnosisDto get_diagnosis(Long id){
        Diagnosis diagnosis = diagnosisRepository.findById(id).orElse(null);
        return diagnosis!=null? diagnosis.get_DiagnosisDto():null;
    }

    public DiagnosisDto deleteDiagnosis(Long diagnosisId) {
        Diagnosis target = diagnosisRepository.findById(diagnosisId).orElse(null);
        if(target != null){
//            s3Service.deleteFile(target.getImage_url());
            DiagnosisDto dto =target.get_DiagnosisDto();
            diagnosisRepository.delete(target);
            return dto;
        }
        else
            return null;
    }

}
