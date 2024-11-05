package com.example.petcare.service;

import com.example.petcare.dto.CommentDto;
import com.example.petcare.dto.DiaryPageDto;
import com.example.petcare.entity.Comment;
import com.example.petcare.entity.Diary;
import com.example.petcare.entity.DiaryPage;
import com.example.petcare.repository.DiaryPageRepository;
import com.example.petcare.repository.DiaryRepository;
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

    public DiaryPageDto create(MultipartFile image, DiaryPageDto dto, Long diaryId) throws IOException {
        if(!image.isEmpty()){
            String fileName = UUID.randomUUID().toString().replace("-", "")+"_"+image.getOriginalFilename();
            String fullPathName = "C:\\spring_image_test\\diary\\"+fileName;
            image.transferTo(new File(fullPathName));
             dto.setImage_url(fileName);
        }

        Diary diary = diaryRepository.findById(diaryId).orElse(null);
        dto.setDiary(diary);
        dto.setCreateDate(LocalDateTime.now());
        DiaryPage created = diaryPageRepository.save(dto.getDiaryPage());
        return created.getDiaryPageDto();
    }

    public DiaryPageDto deleteDiaryPage(Long diaryPageId) {
        DiaryPage target = diaryPageRepository.findById(diaryPageId).orElse(null);
        if(target != null){
            DiaryPageDto dto =target.getDiaryPageDto();
            diaryPageRepository.delete(target);
            return dto;
        }
        else
            return null;
    }
}
