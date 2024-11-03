package com.example.petcare.service;

import com.example.petcare.dto.PetDto;
import com.example.petcare.entity.Pet;
import com.example.petcare.entity.SiteUser;
import com.example.petcare.repository.PetRepository;
import com.example.petcare.repository.SiteUserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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

    public void deletePet(PetDto petDto, Long userId) throws IOException {
        SiteUser siteUser = userRepository.findById(userId).orElse(null);
        petDto.setSiteUser(siteUser);
        petRepository.delete(petDto.get_Pet());
    }

    public void updatePet(PetDto petDto, Long userId, MultipartFile image) throws IOException {
        if(!image.isEmpty()){
            String fileName = UUID.randomUUID().toString().replace("-", "")+"_"+image.getOriginalFilename();
            String fullPathName = "C:\\spring_image_test\\pet\\"+fileName;
            image.transferTo(new File(fullPathName));
            petDto.setImage_url(fullPathName);
        }
        SiteUser siteUser = userRepository.findById(userId).orElse(null);
        petDto.setSiteUser(siteUser);

        Pet pet = petRepository.findById(petDto.getId()).orElse(null);
        if (pet != null) {
            BeanUtils.copyProperties(petDto, pet, "id");
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
