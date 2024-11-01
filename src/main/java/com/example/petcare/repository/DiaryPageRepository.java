package com.example.petcare.repository;

import com.example.petcare.entity.Diary;
import com.example.petcare.entity.DiaryPage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DiaryPageRepository extends JpaRepository<DiaryPage, Integer> {
    @Query(value="SELECT * FROM diary_page WHERE diary_id = :diaryId",nativeQuery = true)
    List<DiaryPage> findByDiaryId(Long diaryId);
}
