package com.example.petcare.controller;

import com.example.petcare.dto.DiagnosisDto;
import com.example.petcare.dto.DiaryPageDto;
import com.example.petcare.dto.PetDto;
import com.example.petcare.service.DiaryPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
public class DiaryPageController {
    @Autowired
    private DiaryPageService diaryPageService;

    @GetMapping("/diary/{diaryId}/page")
    public ResponseEntity<List<DiaryPageDto>> diary_page_list(@PathVariable Long diaryId) {
        List<DiaryPageDto> dtos = diaryPageService.get_diary_page_list(diaryId);
        return ResponseEntity.ok().body(dtos);
    }

    @PostMapping("/diary/{diaryId}/page")
    public ResponseEntity<DiaryPageDto> create_diary_page(@PathVariable Long diaryId, @RequestPart("image") MultipartFile image, @RequestPart("DiaryPageDto") DiaryPageDto dto)throws IOException {
        DiaryPageDto createdDto = diaryPageService.create(image, dto,diaryId);
        return ResponseEntity.ok().body(createdDto);
    }

    @DeleteMapping("/diary/page/{diaryPageId}")//pet 삭제
    public ResponseEntity<DiaryPageDto> deleteDiaryPage(@PathVariable Long diaryPageId) {
        DiaryPageDto deletedDto = diaryPageService.deleteDiaryPage(diaryPageId);
        if(deletedDto != null)
            return ResponseEntity.status(HttpStatus.OK).body(deletedDto);
        else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

    }

    @PostMapping("/updateDiaryPage/{id}")
    public ResponseEntity<DiaryPageDto> updateDiaryPage(@PathVariable Long id, @RequestBody DiaryPageDto dto) {
        DiaryPageDto updatedDto = diaryPageService.updateDiaryPage(id, dto);
        if(updatedDto != null)
            return ResponseEntity.status(HttpStatus.OK).body(updatedDto);
        else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

}
