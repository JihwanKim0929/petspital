package com.example.petcare.service;

import com.example.petcare.dto.DiaryPageDto;
import com.example.petcare.entity.Diary;
import com.example.petcare.entity.DiaryPage;
import com.example.petcare.repository.DiaryPageRepository;
import com.example.petcare.repository.DiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DiaryPageService {
    @Autowired
    private DiaryPageRepository diaryPageRepository;

    @Autowired
    private DiaryRepository diaryRepository;

    public List<DiaryPageDto> get_diary_page_list(Long diaryId) {
        return diaryPageRepository.findByDiaryId(diaryId)
                .stream()
                .map(diaryPage -> diaryPage.getDiaryPageDto())
                .collect(Collectors.toList());
    }

    public DiaryPageDto create(DiaryPageDto dto, Long diaryId) {
        Diary diary = diaryRepository.findById(diaryId).orElse(null);
        dto.setDiary(diary);
        dto.setCreateDate(LocalDateTime.now());
        DiaryPage created = diaryPageRepository.save(dto.getDiaryPage());
        return created.getDiaryPageDto();
    }

}
