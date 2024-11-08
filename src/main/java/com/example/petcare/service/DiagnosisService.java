package com.example.petcare.service;

import com.example.petcare.dto.DiagnosisDto;
import com.example.petcare.dto.DiaryPageDto;
import com.example.petcare.entity.Diagnosis;
import com.example.petcare.entity.DiaryPage;
import com.example.petcare.entity.Disease;
import com.example.petcare.entity.Pet;
import com.example.petcare.repository.DiagnosisRepository;
import com.example.petcare.repository.DiseaseRepository;
import com.example.petcare.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class DiagnosisService {

    @Autowired
    private DiagnosisRepository diagnosisRepository;
    @Autowired
    private DiseaseRepository diseaseRepository;
    @Autowired
    private PetRepository petRepository;

    public DiagnosisDto createDiagnosis(Long petId, MultipartFile image, DiagnosisDto diagnosisDto) throws IOException {
        if(image.isEmpty())
            return null;

        Pet pet = petRepository.findById(petId).orElse(null);
        diagnosisDto.setPet(pet);

        //save image and set path to diagnosis dto
        String fileName = UUID.randomUUID().toString().replace("-", "")+"_"+image.getOriginalFilename();
        String fullPathName = "C:\\spring_image_test\\diagnosis\\"+fileName;
        image.transferTo(new File(fullPathName));
        diagnosisDto.setImage_url(fileName);

        //get disease list from python
//        URI uri = UriComponentsBuilder
//                .fromUriString("http://localhost:8000")
//                .path("/image_read")
//                .encode()
//                .build()
//                .toUri();

//        RestTemplate restTemplate = new RestTemplate();
//        Integer[] result = restTemplate.postForObject(uri, fileName, Integer[].class);    //postForObject(uri,sending_body,class type to receive)

        //set disease to diagnosisDto
        List<Disease> diseaseList = new ArrayList<>();
        diseaseList.add(diseaseRepository.findById(1L).orElse(null));
        diseaseList.add(diseaseRepository.findById(2L).orElse(null));
        diseaseList.add(diseaseRepository.findById(3L).orElse(null));
        diagnosisDto.setDiseaseList(diseaseList.stream()
                .map(disease -> disease.getDiseaseDto())
                .collect(Collectors.toList()));
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
            DiagnosisDto dto =target.get_DiagnosisDto();
            diagnosisRepository.delete(target);
            return dto;
        }
        else
            return null;
    }
}
