package com.example.petcare.controller;

import com.example.petcare.dto.DiaryPageDto;
import com.example.petcare.service.DiaryPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<DiaryPageDto> create_diary_page(@PathVariable Long diaryId, @RequestBody DiaryPageDto dto) {
        DiaryPageDto createdDto = diaryPageService.create(dto,diaryId);
        return ResponseEntity.ok().body(createdDto);
    }

}
