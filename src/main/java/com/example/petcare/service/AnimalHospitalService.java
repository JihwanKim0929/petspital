package com.example.petcare.service;

import com.example.petcare.dto.AnimalHospitalDto;
import com.example.petcare.dto.DiaryDto;
import com.example.petcare.dto.PetDto;
import com.example.petcare.dto.SiteUserDto;
import com.example.petcare.entity.AnimalHospital;
import com.example.petcare.entity.Diary;
import com.example.petcare.entity.Pet;
import com.example.petcare.entity.SiteUser;
import com.example.petcare.repository.AnimalHospitalRepository;
import com.example.petcare.repository.SiteUserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AnimalHospitalService {
    @Autowired
    AnimalHospitalRepository animalHospitalRepository;
    @Autowired
    SiteUserRepository userRepository;

    public AnimalHospitalDto createAnimalHospital(AnimalHospitalDto animalHospitalDto, SiteUserDto siteUserDto){
            animalHospitalDto.setSiteUser(siteUserDto.get_SiteUser());
            AnimalHospital created = animalHospitalRepository.save(animalHospitalDto.getAnimalHospital());
            return created.getAnimalHospitalDto();
    }

    public AnimalHospitalDto getAnimalHospital(Long id){
        AnimalHospital animalHospital = animalHospitalRepository.findById(id).orElse(null);
        return animalHospital!=null ? animalHospital.getAnimalHospitalDto() : null;
    }

    public AnimalHospitalDto getAnimalHospitalByUserId(Long userId){
        AnimalHospital animalHospital = animalHospitalRepository.findBySiteUserId(userId).orElse(null);
        return animalHospital!=null ? animalHospital.getAnimalHospitalDto() : null;
    }

    public List<PetDto> getPets_vet(Long userId){
        AnimalHospital animalHospital = animalHospitalRepository.findBySiteUserId(userId).orElse(null);
        if(animalHospital == null){
            return null;
        }
        return animalHospital.getPetList()
                .stream()
                .map(pet->pet.get_PetDto())
                .collect(Collectors.toList());
    }

    public List<AnimalHospitalDto> getAnimalHospitalList(){
        return animalHospitalRepository.findAll()
                .stream()
                .map(animalHospital->animalHospital.getAnimalHospitalDto())
                .collect(Collectors.toList());
    }

    public void updateAnimalHospital(AnimalHospitalDto newAnimalHospitalDto, Long userId){
        SiteUser siteUser = userRepository.findById(userId).orElse(null);//현재 유저
        newAnimalHospitalDto.setSiteUser(siteUser);

        AnimalHospital animalHospital = animalHospitalRepository.findBySiteUserId(userId).orElse(null);//기존
        if(animalHospital != null){
            BeanUtils.copyProperties(newAnimalHospitalDto, animalHospital, "id");
            animalHospitalRepository.save(animalHospital);
        }
    }

}
