package com.example.petcare.repository;

import com.example.petcare.entity.Diary;
import com.example.petcare.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
    @Query(value="SELECT * FROM diary WHERE pet_id = :petId",nativeQuery = true)
    List<Diary> findByPetId(Long petId);
}
