package com.example.petcare.repository;

import com.example.petcare.entity.Diagnosis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DiagnosisRepository extends JpaRepository<Diagnosis, Long> {
    @Query(value="SELECT * FROM diagnosis WHERE pet_id = :petId",nativeQuery = true)
    List<Diagnosis> findByPetId(Long petId);
}
