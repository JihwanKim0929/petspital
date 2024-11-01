package com.example.petcare.service;

import com.example.petcare.dto.DiaryDto;
import com.example.petcare.entity.Diary;
import com.example.petcare.entity.Pet;
import com.example.petcare.repository.DiaryRepository;
import com.example.petcare.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DiaryService {
    @Autowired
    private DiaryRepository diaryRepository;

    @Autowired
    private PetRepository petRepository;

    public DiaryDto createDiary(DiaryDto diaryDto,Long petId) {
        Pet pet = petRepository.findById(petId).orElse(null);
        diaryDto.setPet(pet);
        diaryDto.setCreateDate(LocalDateTime.now());
        Diary created = diaryRepository.save(diaryDto.getDiary());
        return created.getDiaryDto();
    }

    public DiaryDto getDiary(Long id) {
        Diary diary = diaryRepository.findById(id).orElse(null);
        return diary!=null?diary.getDiaryDto():null;
    }

    public List<DiaryDto> get_diary_list(Long petId) {
        return diaryRepository.findByPetId(petId)
                .stream()
                .map(diary->diary.getDiaryDto())
                .collect(Collectors.toList());
    }

}
