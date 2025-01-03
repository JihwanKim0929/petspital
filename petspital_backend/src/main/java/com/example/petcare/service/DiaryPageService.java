package com.example.petcare.service;

import com.example.petcare.S3Service;
import com.example.petcare.dto.CommentDto;
import com.example.petcare.dto.DiaryPageDto;
import com.example.petcare.dto.ReservationDto;
import com.example.petcare.entity.Comment;
import com.example.petcare.entity.Diary;
import com.example.petcare.entity.DiaryPage;
import com.example.petcare.entity.Reservation;
import com.example.petcare.repository.DiaryPageRepository;
import com.example.petcare.repository.DiaryRepository;
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
public class DiaryPageService {
    @Autowired
    private DiaryPageRepository diaryPageRepository;

    @Autowired
    private DiaryRepository diaryRepository;
    @Autowired
    private S3Service s3Service;

    public List<DiaryPageDto> get_diary_page_list(Long diaryId) {
        return diaryPageRepository.findByDiaryId(diaryId)
                .stream()
                .map(diaryPage -> diaryPage.getDiaryPageDto())
                .collect(Collectors.toList());
    }

    public DiaryPageDto create(MultipartFile image, DiaryPageDto dto, Long diaryId) throws IOException {
        if(image != null){
            String fileName = s3Service.uploadFile(image);
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
//            s3Service.deleteFile(target.getImage_url());
            DiaryPageDto dto =target.getDiaryPageDto();
            diaryPageRepository.delete(target);
            return dto;
        }
        else
            return null;
    }

    public DiaryPageDto updateDiaryPage(Long id, MultipartFile image, DiaryPageDto dto) throws IOException {
        DiaryPage target = diaryPageRepository.findById(id).orElse(null);
        if(image != null){
            String fileName = s3Service.uploadFile(image);
            dto.setImage_url(fileName);
            if(target != null){
                BeanUtils.copyProperties(dto, target, "id","diary","createDate");
                diaryPageRepository.save(target);
            }
        }else{
            if(target != null){
                BeanUtils.copyProperties(dto, target, "id","diary","createDate");
                diaryPageRepository.save(target);
            }
        }

        return target.getDiaryPageDto();
    }
}
