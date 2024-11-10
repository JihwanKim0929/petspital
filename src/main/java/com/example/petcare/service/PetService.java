package com.example.petcare.service;

import com.example.petcare.dto.BoardDto;
import com.example.petcare.dto.PetDto;
import com.example.petcare.entity.*;
import com.example.petcare.repository.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PetService {
    @Autowired
    PetRepository petRepository;
    @Autowired
    SiteUserRepository userRepository;
    @Autowired
    private DiaryRepository diaryRepository;
    @Autowired
    private DiaryService diaryService;
    @Autowired
    private DiagnosisRepository diagnosisRepository;
    @Autowired
    private DiagnosisService diagnosisService;
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private ReservationService reservationService;

    public PetDto createPet(PetDto petDto, Long userId, MultipartFile image) throws IOException {
        if(!image.isEmpty()){
            String fileName = UUID.randomUUID().toString().replace("-", "")+"_"+image.getOriginalFilename();
            String fullPathName = "C:\\spring_image_test\\pet\\"+fileName;
            image.transferTo(new File(fullPathName));
            petDto.setImage_url(fileName);
        }
        SiteUser siteUser = userRepository.findById(userId).orElse(null);
        petDto.setSiteUser(siteUser);
        Pet created = petRepository.save(petDto.get_Pet());
        return created.get_PetDto();
    }

    public PetDto deletePet(Long petId) {
        Pet target = petRepository.findById(petId).orElse(null);
        if(target != null){

            List<Diary> diaries = diaryRepository.findByPetId(petId);
            for(Diary diary : diaries){
                diaryService.deleteDiary(diary.getId());
            }

            List<Diagnosis> diagnoses = diagnosisRepository.findByPetId(petId);
            for(Diagnosis diagnosis : diagnoses){
                diagnosisService.deleteDiagnosis(diagnosis.getId());
            }

            List<Reservation> reservations = reservationRepository.findByPetId(petId);
            for(Reservation reservation : reservations){
                reservationService.deleteReservation(reservation.getId());
            }

            PetDto dto =target.get_PetDto();
            petRepository.delete(target);
            return dto;
        }
        else
            return null;
    }

    /*public void updatePet(Long petId, PetDto newpetDto, Long userId, MultipartFile image) throws IOException {
        //기존pet id, new dto, 기존user id, new img
        System.out.println("userID : ");
        System.out.println(userId);
        if(!image.isEmpty()){
            String fileName = UUID.randomUUID().toString().replace("-", "")+"_"+image.getOriginalFilename();
            String fullPathName = "C:\\spring_image_test\\pet\\"+fileName;
            image.transferTo(new File(fullPathName));
            newpetDto.setImage_url(fullPathName);
        }
        SiteUser siteUser = userRepository.findById(userId).orElse(null);//현재 유저
        newpetDto.setSiteUser(siteUser);

        Pet pet = petRepository.findById(petId).orElse(null);
        if (pet != null) {
            BeanUtils.copyProperties(newpetDto, pet, "id");
            petRepository.save(pet);
            System.out.println("saved to database");
        }
        System.out.println("not saved to database");
    }*/
    public void updatePet(Long petId, PetDto newpetDto) throws IOException {
        Pet pet = petRepository.findById(petId).orElse(null);
        if (pet != null) {
            BeanUtils.copyProperties(newpetDto, pet, "id","siteUser","image_url");
            petRepository.save(pet);
        }
    }

    public PetDto get_pet(Long petId){
        Pet pet = petRepository.findById(petId).orElse(null);
        return pet!=null? pet.get_PetDto():null;
    }

    public List<PetDto> get_pet_list(Long userId){
        return petRepository.findByUserId(userId)
                .stream()
                .map(pet->pet.get_PetDto())
                .collect(Collectors.toList());
    }
}
